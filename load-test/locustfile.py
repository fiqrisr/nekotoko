from contextlib import contextmanager
from locust import task
from locust.contrib.fasthttp import ResponseContextManager
from locust_plugins.users import RestUser
from json import JSONDecodeError

class RestWithAuth(RestUser):
  abstract = True
  user_id = ""

  def on_start(self):
    data = {
      "username": "fiqrisr",
      "password": "fiqri123"
    }

    with self.client.post("/api/auth/login", json = data, catch_response = True) as response:
      try:
        access_token = response.json()["data"]["accessToken"]
        self.user_id = response.json()["data"]["user"]["id"]

        if access_token:
          self.access_token = access_token
      except JSONDecodeError:
        response.failure("Response could not be decoded as JSON")
      except KeyError:
        response.failure("Response did not contain expected key 'accessToken'")

  @contextmanager
  def rest(self, method, url, **kwargs) -> ResponseContextManager:
    headers = {
      "Authorization": f"Bearer {self.access_token}"
    }

    with super().rest(method, url, headers = headers, **kwargs) as resp:
      resp: ResponseContextManager
      if resp.js and "error" in resp.js and resp.js["error"] is not None:
          resp.failure(resp.js["error"])
      yield resp


class RestLoadTest(RestWithAuth):
  def getProducts(self):
    with self.rest("GET", "/api/product") as resp:
      return resp.js["data"]["products"]

  @task
  def createOrder(self):
    products = self.getProducts()
    product_id = products[0]["id"]
    product_price = products[0]["price"]

    order_data = {
      "user_id": self.user_id,
      "order_details": [
        {
          "product_id": product_id,
          "quantity": 2,
          "total_price": product_price
        }
      ],
      "paid_amount": product_price,
      "total_amount": product_price
    }

    with self.rest("POST", "/api/order", json = order_data) as resp:
      assert resp.js["data"] is not None

  @task
  def getOrders(self):
    with self.rest("GET", "/api/order?order=desc&page=1&sort=created_at&take=100") as resp:
      assert resp.js["data"] is not None
