import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();
  
  public type Game = {
    name : Text;
    image : Storage.ExternalBlob;
    trailerUrl : Text;
    description : Text;
    price : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  let games = Map.empty<Text, Game>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  func assertAdmin(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  public shared ({ caller }) func addGame(
    name : Text,
    image : Storage.ExternalBlob,
    trailerUrl : Text,
    description : Text,
    price : Nat,
  ) : async () {
    assertAdmin(caller);
    if (games.containsKey(name)) { Runtime.trap("Game already exists") };
    let game : Game = {
      name;
      image;
      trailerUrl;
      description;
      price;
    };
    games.add(name, game);
  };

  public query ({ caller }) func getGames() : async [Game] {
    games.values().toArray();
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
