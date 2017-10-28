# Car Auction Network

> This is an interactive, distributed, car auction demo. List assets for sale (setting a reserve price), and watch as assets that have met their reserve price are automatically transferred to the highest bidder at the end of the auction.

This business network defines:

**Participants:**
`Member` `Auctioneer`

**Assets:**
`Product` `ProductListing`

**Transactions:**
`Offer` `CloseBidding`

The `makeOffer` function is called when an `Offer` transaction is submitted. The logic simply checks that the listing for the offer is still for sale, and then adds the offer to the listing, and then updates the offers in the `ProductListing` asset registry.

The `closeBidding` function is called when a `CloseBidding` transaction is submitted for processing. The logic checks that the listing is still for sale, sorts the offers by bid price, and then if the reserve has been met, transfers the ownership of the product associated with the listing to the highest bidder. Money is transferred from the buyer's account to the seller's account, and then all the modified assets are updated in their respective registries.

To test this Business Network Definition in the **Test** tab:

In the `Auctioneer` participant registry, create a new participant.

```
{
  "$class": "org.cmpe272.evergreen.auction.Auctioneer",
  "email": "auction@cmpe272.org",
  "firstName": "Jenny",
  "lastName": "Jones"
}
```

In the `Member` participant registry, create two participants.

```
{
  "$class": "org.cmpe272.evergreen.auction.Member",
  "balance": 5000,
  "email": "memberA@cmpe272.org",
  "firstName": "Amy",
  "lastName": "Williams"
}
```

```
{
  "$class": "org.cmpe272.evergreen.auction.Member",
  "balance": 5000,
  "email": "memberB@cmpe272.org",
  "firstName": "Billy",
  "lastName": "Thompson"
}
```

In the `Product` asset registry, create a new asset of a product owned by `memberA@cmpe272.org`.

```
{
  "$class": "org.cmpe272.evergreen.auction.Product",
  "pid": "pid:1234",
  "owner": "resource:org.cmpe272.evergreen.auction.Member#memberA@cmpe272.org"
}
```

In the `ProductListing` asset registry, create a product listing for car `pid:1234`.

```
{
  "$class": "org.cmpe272.evergreen.auction.ProductListing",
  "listingId": "listingId:ABCD",
  "reservePrice": 3500,
  "description": "Arium Nova",
  "state": "FOR_SALE",
  "product": "resource:org.cmpe272.evergreen.auction.Product#pid:1234"
}
```

You've just listed an Arium Nova for auction, with a reserve price of 3500!

As soon as a `ProductListing` has been created (and is in the `FOR_SALE` state) participants can submit `Offer` transactions to bid on a product listing.

Submit an `Offer` transaction, by submitting a transaction and selecting `Offer` from the dropdown.

```
{
  "$class": "org.cmpe272.evergreen.auction.Offer",
  "bidPrice": 2000,
  "listing": "resource:org.cmpe272.evergreen.auction.ProductListing#listingId:ABCD",
  "member": "resource:org.cmpe272.evergreen.auction.Member#memberA@cmpe272.org"
}
```

```
{
  "$class": "org.cmpe272.evergreen.auction.Offer",
  "bidPrice": 3500,
  "listing": "resource:org.cmpe272.evergreen.auction.ProductListing#listingId:ABCD",
  "member": "resource:org.cmpe272.evergreen.auction.Member#memberB@cmpe272.org"
}
```

To end the auction submit a `CloseBidding` transaction for the listing.

```
{
  "$class": "org.cmpe272.evergreen.auction.CloseBidding",
  "listing": "resource:org.cmpe272.evergreen.auction.ProductListing#listingId:ABCD"
}
```

This simply indicates that the auction for `listingId:ABCD` is now closed, triggering the `closeBidding` function that was described above.

To see the Product was sold you need to click on the `Product` asset registry to check the owner of the car. The reserve price was met by owner `memberB@cmpe272.org` so you should see the owner of the product is now `memberB@cmpe272.org`.

If you check the state of the ProductListing with `listingId:ABCD` is should be `SOLD`.

If you click on the `Member` asset registry you can check the balance of each User. You should see that the balance of the buyer `memberB@cmpe272.org` has been debited by `3500`, whilst the balance of the seller `memberA@cmpe272.org` has been credited with `3500`.

Congratulations!
