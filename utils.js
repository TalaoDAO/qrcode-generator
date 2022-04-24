exports.VOUCHER_OBJ = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    {
      "name" : "https://schema.org/name",
      "description" : "https://schema.org/description",
      "TezVoucher_1" : {
        "@id": "https://github.com/TalaoDAO/context/blob/main/README.md",
        "@context": {
          "@version": 1.1,
          "@protected": true,
          "schema" : "https://schema.org/",
          "id": "@id",
          "type": "@type",
          "affiliate" : {
            "@id" : "https://github.com/TalaoDAO/context/blob/main/README.md",
            "@context" : {
              "@version": 1.1,
              "@protected": true,
              "name" : "schema:name",
              "did" : "schema:identifier",
              "email" : "schema:email",
              "benefit" : {
                "@id" : "https://github.com/TalaoDAO/context/blob/main/README",
                "@context" : {
                  "price" : "schema:value",
                  "category" : "schema:category",
                  "incentiveCompensation" : "schema:incentiveCompensation"
                }
              },
              "paymentAccepted" : {
                "@id" : "schema:paymentAccepted",
                "@context" : {
                  "blockchain" : "schema:name",
                  "currency" : "schema:currency",
                  "blockchainAccount" : "schema:identifier"
                }
              }
            }
          },
          "offers" : {
            "@id" : "schema:offer",
            "@context" : {
              "@version": 1.1,
              "@protected": true,
              "startDate" : "schema:date",
              "category" : "schema:category",
              "endDate" : "schema:date",
              "benefit" : {
                "@id" : "https://github.com/TalaoDAO/context/blob/main/README",
                "@context" : {
                  "price" : "schema:value",
                  "category" : "schema:category",
                  "discount" : "schema:discount"
                }
              }
            }
          },
          "offeredBy" : {
            "@id" : "schema:offeredBy",
            "@context" : {
              "@version": 1.1,
              "@protected": true,
              "description" : "schema:description",
              "website" : "schema:website",
              "logo": {"@id" : "schema:image", "@type" : "@id"},
              "did" : "schema:identifier",
              "name" : "schema:name",
              "paymentMethod" : {
                "@id" : "schema:paymentMethod",
                "@context" : {
                  "currency" : "schema:currency",
                  "blockchain" : "schema:name",
                  "blockchainAccount" : "schema:identifier"
                }
              }
            }
          },
          "issuedBy" : {
            "@id" : "schema:issuedBy",
            "@context" : {
              "@version": 1.1,
              "@protected": true,
              "website" : "schema:website",
              "logo": {"@id" : "schema:image", "@type" : "@id"},
              "did" : "schema:identifier",
              "name" : "schema:name",
              "paymentAccepted" : {
                "@id" : "schema:paymentMethod",
                "@context" : {
                  "currency" : "schema:currency",
                  "blockchain" : "schema:name",
                  "blockchainAccount" : "schema:identifier"
                }
              },
              "paymentMethod" : {
                "@id" : "schema:paymentMethod",
                "@context" : {
                  "currency" : "schema:currency",
                  "blockchain" : "schema:name",
                  "blockchainAccount" : "schema:identifier"
                }
              }
            }
          }
        }
      }
    }
  ],
  "id": "urn:uuid:8930fe9c-0e22-11ec-9ef1-f37fc4c00c40....",
  "type": ["VerifiableCredential", "TezVoucher_1"],
  "issuer": "did:tz:tz1NyjrTUNxDpPaqNZ84ipGELAcTWYg6s5Du",
  "name" : [
    {
      "@value": "5% off Tezotopia NFTs",
      "@language": "en"
    },
    {
      "@value": "5% off Tezotopia NFTs",
      "@language": "de"
    },
    {
      "@value": "5% de reduction sur les NFT Tezotopia",
      "@language": "fr"
    }
  ],
  "description" : [
    {
      "@language": "en",
      "@value": "Get a 5% discount on your first Tezotop Block ! "
    },
    {
      "@language": "de",
      "@value": "Erhalten Sie 5 % Rabatt auf Ihren ersten Tezotop-Block!"
    },
    {
      "@language": "fr",
      "@value": "Bénéficiez de 5% de réduction sur votre premier Bloc Tezotop ! "
    }
  ],

  "issuanceDate": "2021-09-15T19:55:00Z......",
  "expirationDate" : "2023-09-15T19:55:00Z.....",
  "credentialSubject" : {
    "type" : "TezVoucher_1",
    "id" : ".....",
    "offers" : {
      "startDate" : "2022-04-08T19:55:00Z",
      "endDate" : "2022-06-08T19:55:00Z",
      "category" : "discounted_coupon",
      "benefit" : {
        "category" : "discount",
        "discount" : "5%"

      }
    },
    "offeredBy": {
      "logo": "ipfs://QmZmdndUVRoxiVhUnjGrKnNPn8ah3jT8fxTCLMnAzRAFFZ",
      "name": "GifGames",
      "description" : "gaming platform Tezotopia",
      "paymentMethod" : {
        "blockchain" : "Tezos",
        "currency" : "XTZ",
        "blockchainAccount" : "tz1iyjrTUNxDpPaqNZ84ipGELAcTWYg66789"
      }
    },
    "issuedBy": {
      "logo": "ipfs://QmZmdndUVRoxiVhUnjGrKnNPn8ah3jT8fxTCLMnAzRAFFZ",
      "name": "Talao",
      "paymentAccepted" : {
        "blockchain" : "Tezos",
        "currency" : "XTZ",
        "blockchainAccount" : "tz1NyjrTUNxDpPaqNZ84ipGELAcTWYg6s5Du"
      },
      "paymentMethod" : {
        "blockchain" : "Tezos",
        "currency" : "XTZ",
        "blockchainAccount" : "tz1NyjrTUNxDpPaqNZ84ipGELAcTWYg6s5Du"
      }
    },
    "affiliate": {
      "name": "Podo",
      "email" : "podo@gmail.com",
      "paymentAccepted" : {
        "blockchain" : "Tezos",
        "currency" : "XTZ",
        "blockchainAccount" : "tz1NyjrTUNxDpPaqNZ84ipGELAcTWYg5555"
      },
      "benefit" : {
        "category" : "commission",
        "incentiveCompensation" : "2%"
      }
    }
  }
}
