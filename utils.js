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
    "issuer": "did:tz:issuer",
    "credentialSubject" : {
        "id" : "did:wallet",
        "type" : "TezVoucher_1",
        "associatedAddress" : {
            "blockchainTezos" : "",
            "blockchainEthereum" : ""
        },
        "offers" : [{
            "startDate" : "2022-04-08T19:55:00Z",
            "endDate" : "2022-06-08T19:55:00Z",
            "category" : "discounted_coupon",
            "duration" : "",
            "benefit" : {
                "category" : "discount",
                "discount" : "15%"
            },
            "offeredBy": {
                "logo": "ipfs://QmZmdndUVRoxiVhUnjGrKnNPn8ah3jT8fxTCLMnAzRAFFZ",
                "name": "GifGames",
                "description" : "Gaming platform of Tezotopia",
                "paymentMethod" : {
                    "blockchain" : "Tezos",
                    "currency" : "XTZ",
                    "blockchainAccount" : ""
                }
            }
        }],
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
            "name" : "https://schema.org/name",
            "description" : "https://schema.org/description",
            "MembershipCard_1" : {
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
                    "offers" : {
                        "@id" : "schema:offer",
                        "@context" : {
                            "@version": 1.1,
                            "@protected": true,
                            "startDate" : "schema:date",
                            "category" : "schema:category",
                            "duration" : "schema:duration",
                            "endDate" : "schema:date",
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
    "type": ["VerifiableCredential", "MembershipCard_1"],
    "issuer": "did:tz:issuer",
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
            "@value": "Get a Tezotopia Membership card"
        },
        {
            "@language": "de",
            "@value": "Erhalten Sie 5 % Rabatt auf Ihren ersten Tezotop-Block!"
        },
        {
            "@language": "fr",
            "@value": "Get a Tezotopia Membership card"
        }
    ],
    "credentialSubject" : {
        "id" : "did:wallet",
        "type" : "MembershipCard_1",
        "associatedAddress" : {
                "blockchainTezos" : "tz1345765476547654",
                "blockchainEthereum" : "0x1345765476547654"
        },
        "offers" : [{
            "startDate" : "2022-04-08T19:55:00Z",
            "endDate" : "2022-06-08T19:55:00Z",
            "category" : "membershipcard",
            "duration" : "360",
            "cardPrice" : {
                "currency" : "EUR",
                "value" : "50"
            },
            "benefit" : {
                "category" : "discount",
                "discount" : "5%"
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
            }
        }],
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
        }
    }

}

exports.AGORA_OBJ = {
    "@context": ["https://www.w3.org/2018/credentials/v1",
        {
            "name" : "https://schema.org/name",
            "description" : "https://schema.org/description",
            "AgoraPass" : {
                "@id": "https://github.com/TalaoDAO/context/blob/main/README.mdidentitypass",
                "@context": {
                    "@version": 1.1,
                    "@protected": true,
                    "schema" : "https://schema.org/",
                    "id": "@id",
                    "type": "@type",
                    "email" : "schema:email",
                    "image": {"@id" : "schema:image", "@type" : "@id"},
                    "duration" : "schema:duration",
                    "telephone" : "schema:telephone",
                    "givenName" : "schema:givenName",
                    "familyName" : "schema:familyName",
                    "gender" : "schema:gender",
                    "address" : "schema:address",
                    "birthDate" : "schema:birthDate",
                    "issuedBy": {
                        "@id": "schema:issuedBy",
                        "@context": {
                            "@version": 1.1,
                            "@protected": true,
                            "schema" : "https://schema.org/",
                            "name" :  "schema:name",
                            "address" : "schema:address",
                            "logo" : { "@id" : "schema:logo", "@type" : "@id"}
                        }
                    }
                }
            }
        }
    ],
    "id": "",
    "type": ["VerifiableCredential", "AgoraPass"],
    "issuer": "",
    "name" : [
        {
            "@value": "Agora pass",
            "@language": "en"
        },
        {
            "@value": "Agora Pass",
            "@language": "fr"
        }
    ],
    "description" : [
        {
            "@language": "en",
            "@value": "It can be used to authenticate with Agora services."
        },
        {
            "@language": "fr",
            "@value": "Cette attestationpermet de s'authentifier aupr??s des services d'Agora."
        }
    ],
    "issuanceDate": "",
    "credentialSubject" : {
        "id": "",
        "type" : "AgoraPass",
        "email" : "john.doe@gmail.com",
        "image" : "",
        "familyName" : "Doe",
        "givenName" : "John",
        "duration" : "30",
        "issuedBy" : {
            "name" : "Agora",
            "address" : "4, rue Louis-Gu??rin, 69626 Villeurbanne, France",
            "logo" : "https://talao.mypinata.cloud/ipfs/QmNwbEEupT7jR2zmrA87FsN4hUS8eXnCxM8DsL9RXc25cu"
        }
    }
}



exports.VOUCHER_KEY = "voucher";
exports.MEMBERSHIP_KEY = "membership";
exports.VOUCHER_MOBILE_KEY = "voucher_mobile";
exports.AGORA_KEY = "agora_pass";
