exports.VOUCHER_OBJ = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        {
            "TezVoucher_1" : {
                "@id": "https://github.com/TalaoDAO/context/blob/main/README.md",
                "@context": {
                    "@version": 1.1,
                    "@protected": true,
                    "schema" : "https://schema.org/",
                    "id": "@id",
                    "type": "@type",
                    "associatedAddress" : {
                        "@id": "https://schema.org/address",
                        "@context" : {
                            "@protected" : true,
                            "blockchainTezos" : "https://schema.org/blockchain",
                            "blockchainEthereum" : "https://schema.org/blockchain"
                        }
                    },
                    "affiliate" : {
                        "@id" : "https://github.com/TalaoDAO/context/blob/main/README.md",
                        "@context" : {
                            "@version": 1.1,
                            "@protected": true,
                            "name" : "schema:name",
                            "did" : "schema:identifier",
                            "email" : "schema:email",
                            "phone" : "schema:telephone",
                            "pseudo" : "schema:givenName",
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
                            "duration" : "schema:duration",
                            "endDate" : "schema:date",
                            "analytics" : "schema:website",
                            "userGuide" : "schema:userGuide",
                            "benefit" : {
                                "@id" : "https://github.com/TalaoDAO/context/blob/main/README",
                                "@context" : {
                                    "price" : "schema:value",
                                    "category" : "schema:category",
                                    "discount" : "schema:discount"
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
    "id": "urn:uuid:random",
    "type": ["VerifiableCredential", "TezVoucher_1"],
    "expirationDate" : "2022-09-08T19:55:00Z",
    "issuer": "did:tz:issuer",
    "credentialSubject" : {
        "id" : "did:wallet",
        "type" : "TezVoucher_1",
        "associatedAddress" : {
            "blockchainTezos" : "tz1Q7zwo7fmRNyCL7jdz6hcPSsYukkWY66Q3",
            "blockchainEthereum" : ""
        },
        "offers" : {
            "startDate" : "2022-04-08T19:55:00Z",
            "endDate" : "2022-06-08T19:55:00Z",
            "category" : "discounted_coupon",
            "duration" : "30",
            "analytics" : "",
            "userGuide" :  "https://altme.io/#steps-03-575161",
            "benefit" : {
                "category" : "discount",
                "discount" : "15%"
            },
            "offeredBy": {
                "logo": "ipfs://QmZmdndUVRoxiVhUnjGrKnNPn8ah3jT8fxTCLMnAzRAFFZ",
                "name": "Gif Games",
                "website" : "https://tezotopia.com/",
                "description" : "https://tezotopia.com",
                "paymentMethod" : {
                    "blockchain" : "Tezos",
                    "currency" : "XTZ",
                    "blockchainAccount" : ""
                }
            }
        },
        "issuedBy": {
            "logo": "ipfs://QmZmdndUVRoxiVhUnjGrKnNPn8ah3jT8fxTCLMnAzRAFFZ",
            "name": "Talao",
            "paymentAccepted" : {
                "blockchain" : "Tezos",
                "currency" : "XTZ",
                "blockchainAccount" : "tz1Q7zwo7fmRNyCL7jdz6hcPSsYukkWY66Q3"
            },
            "paymentMethod" : {
                "blockchain" : "Tezos",
                "currency" : "XTZ",
                "blockchainAccount" : "tz1NJrXkEhwcqNxkARvb44psCCb4VyJ4Qh1b"
            }
        },
        "affiliate": {
            "name": "to be filled or removed",
            "email" : "to be filled or removed",
            "phone" : "to be filled or removed",
            "pseudo" : "to be filled or removed",
            "paymentAccepted" : {
                "blockchain" : "Tezos",
                "currency" : "XTZ",
                "blockchainAccount" : ""
            },
            "benefit" : {
                "category" : "commission",
                "incentiveCompensation" : "5%"
            }
        }
    }
}

exports.MEMBERSHIP_CARD_OBJ = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        {
            "MembershipCard_1" : {
                "@id": "https://github.com/TalaoDAO/context/blob/main/README.md",
                "@context": {
                    "@version": 1.1,
                    "@protected": true,
                    "schema" : "https://schema.org/",
                    "id": "@id",
                    "type": "@type",
                    "ageRange" : "schema:ageRange",
                    "nationality" : "schema:nationality",
                    "addressCountry" : "schema:addressCountry",
                    "associatedAddress" : {
                        "@id": "https://schema.org/address",
                        "@context" : {
                            "@protected" : true,
                            "blockchainTezos" : "https://schema.org/blockchain",
                            "blockchainEthereum" : "https://schema.org/blockchain"
                        }
                    },
                    "offers" : {
                        "@id" : "schema:offer",
                        "@context" : {
                            "@version": 1.1,
                            "@protected": true,
                            "startDate" : "schema:date",
                            "category" : "schema:category",
                            "duration" : "schema:duration",
                            "endDate" : "schema:date",
                            "analytics" : "schema:website",
                            "userGuide" : "schema:userGuide",
                            "cardPrice": {
                                "@context": {
                                    "@version": 1.1,
                                    "@protected": true,
                                    "currency": "schema:currency",
                                    "value": "schema:value"
                                },
                                "@id": "https://vocabulary.vc.compell.io/properties/cardPrice"
                            },
                            "benefit" : {
                                "@id" : "https://github.com/TalaoDAO/context/blob/main/README",
                                "@context" : {
                                    "price" : "schema:value",
                                    "category" : "schema:category",
                                    "discount" : "schema:discount"
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
                                    "name" : "schema:name"
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
                            "name" : "schema:name"
                        }
                    }
                }
            }
        }
    ],
    "id": "urn:uuid:random",
    "type": ["VerifiableCredential", "MembershipCard_1"],
    "issuer": "did:tz:issuer",
    "credentialSubject" : {
        "id" : "did:wallet",
        "type" : "MembershipCard_1",
        "ageRange" : "",
        "addressCountry" : "",
        "nationality" : "",
        "associatedAddress" : {
            "blockchainTezos" : ""
        },
        "offers" : {
            "startDate" : "2022-04-08T19:55:00Z",
            "endDate" : "2022-06-08T19:55:00Z",
            "category" : "membershipcard",
            "duration" : "365",
            "analytics" : "",
            "userGuide" :  "https://altme.io/#steps-03-575161",
            "cardPrice" : {
                "currency" : "EUR",
                "value" : "0"
            },
            "benefit" : {
                "category" : "discount",
                "discount" : ""
            },
            "offeredBy": {
                "logo": "ipfs://QmZmdndUVRoxiVhUnjGrKnNPn8ah3jT8fxTCLMnAzRAFFZ",
                "name": "GifGames",
                "website" : "https://tezotopia.com",
                "description" : "gaming platform Tezotopia"
            }
        },
        "issuedBy": {
            "logo": "ipfs://QmZmdndUVRoxiVhUnjGrKnNPn8ah3jT8fxTCLMnAzRAFFZ",
            "name": "Talao"
        }
    }
}

exports.ARAGO_OBJ = {
    "@context": ["https://www.w3.org/2018/credentials/v1",
        {
            "AragoPass" : {
                "@id": "https://github.com/TalaoDAO/context/blob/main/README.mdidentitypass",
                "@context": {
                    "@version": 1.1,
                    "@protected": true,
                    "schema" : "https://schema.org/",
                    "id": "@id",
                    "type": "@type",
                    "group" : "schema:group",
                    "duration" : "schema:duration",
                    "issuedBy": {
                        "@id": "schema:issuedBy",
                        "@context": {
                            "@version": 1.1,
                            "@protected": true,
                            "schema" : "https://schema.org/",
                            "name" :  "schema:name",
                            "website": "schema:website",
                            "address" : "schema:address",
                            "logo" : { "@id" : "schema:logo", "@type" : "@id"}
                        }
                    }
                }
            }
        }
    ],
    "id": "",
    "type": ["VerifiableCredential", "AragoPass"],
    "issuer": "",
    "issuanceDate": "",
    "credentialSubject" : {
        "id": "",
        "type" : "AragoPass",
        "group" : "Default",
        "duration" : "360",
        "issuedBy" : {
            "name" : "Arago",
            "website" : "https://arago.studio"
        }
    }
}

exports.LOYALTY_CARD_OBJ = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        {
            "GamingLoyaltyCard_1" : {
                "@id": "https://github.com/TalaoDAO/context/blob/main/README.md#loyaltycard",
                "@context": {
                    "@version": 1.1,
                    "@protected": true,
                    "schema" : "https://schema.org/",
                    "id": "@id",
                    "type": "@type",
                    "ageRange" : "schema:ageRange",
                    "addressCountry" : "schema:addressCountry",
                    "duration" : "schema:duration",
                    "associatedAddress" : {
                        "@id": "https://schema.org/address",
                        "@context" : {
                            "@protected" : true,
                            "blockchainTezos" : "https://schema.org/blockchain",
                            "blockchainEthereum" : "https://schema.org/blockchain"
                        }
                    },
                    "issuedBy" : {
                        "@id" : "schema:memberOf",
                        "@context" : {
                            "@version": 1.1,
                            "@protected": true,
                            "website" : "schema:website",
                            "logo": {"@id" : "schema:image", "@type" : "@id"},
                            "address" : "schema:address",
                            "name" : "schema:name"
                        }
                    },
                    "programName" : "schema:programName"

                }
            }
        }
    ],
    "id": "",
    "type": ["VerifiableCredential", "GamingLoyaltyCard_1"],
    "issuer": "",
    "issuanceDate": "",
    "credentialSubject" : {
        "id" : "",
        "type" : "GamingLoyaltyCard_1",
        "ageRange" :"18-25",
        "duration" : "360",
        "addressCountry" : "",
        "programName" : "Gaming Loayalty Card 1",
        "associatedAddress" : {
            "blockchainTezos" : ""
        },
        "issuedBy" : {
            "name" : "AltMe"
        }

    }
}

exports.VOUCHER_KEY = "voucher";
exports.MEMBERSHIP_KEY = "membership";
exports.VOUCHER_MOBILE_KEY = "voucher_mobile";
exports.ARAGO_KEY = "arago_pass";
exports.LOYAALTY_CARD = "loyaltycard";
exports.MEMBERSHIP_MOBILE_KEY = "membershipcard_mobile";
