import Bool "mo:base/Bool";
import Order "mo:base/Order";
import Text "mo:base/Text";

import Float "mo:base/Float";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Result "mo:base/Result";

actor {
  // Mock data
  stable var priceData : [(Float, Float)] = [];
  stable var orderBook : { asks : [(Float, Float)]; bids : [(Float, Float)] } = { asks = []; bids = [] };

  // Initialize mock data
  private func initMockData() {
    priceData := [
      (1625097600.0, 35000.0),
      (1625184000.0, 34500.0),
      (1625270400.0, 35500.0),
      (1625356800.0, 36000.0),
      (1625443200.0, 35800.0)
    ];

    orderBook := {
      asks = [
        (36100.0, 1.5),
        (36050.0, 2.0),
        (36000.0, 1.0)
      ];
      bids = [
        (35950.0, 1.2),
        (35900.0, 2.5),
        (35850.0, 1.8)
      ];
    };
  };

  // Initialize data
  initMockData();

  // Get price data
  public query func getPriceData() : async [(Float, Float)] {
    priceData
  };

  // Get order book
  public query func getOrderBook() : async { asks : [(Float, Float)]; bids : [(Float, Float)] } {
    orderBook
  };

  // Simulate placing a trade (only updates UI, no actual trading)
  public func placeTrade(isBuy : Bool, amount : Float, price : Float) : async Result.Result<Text, Text> {
    // In a real implementation, we would update the order book and handle the trade
    // For this mock-up, we'll just return a success message
    if (isBuy) {
      #ok("Buy order placed successfully")
    } else {
      #ok("Sell order placed successfully")
    }
  };
}
