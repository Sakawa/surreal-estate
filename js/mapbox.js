var map = L.mapbox.map('map', 'surrealestate.i63b6322').setView([42.364, -71.121], 14);

var myLayer = L.mapbox.featureLayer().addTo(map);

var geoJson = { "features" : [ { "geometry" : { "coordinates" : [ [ [ -71.10651969909668,
                    42.354389508865786
                  ],
                  [ -71.08986854553223,
                    42.36276147125112
                  ],
                  [ -71.08875274658203,
                    42.36624945971019
                  ],
                  [ -71.07832431793211,
                    42.36517137486381
                  ],
                  [ -71.07725143432617,
                    42.36494941392239
                  ],
                  [ -71.07892513275146,
                    42.36123937923603
                  ],
                  [ -71.10445976257324,
                    42.353469793490646
                  ],
                  [ -71.10746383666992,
                    42.35337464975264
                  ],
                  [ -71.10651969909668,
                    42.354389508865786
                  ]
                ] ],
            "type" : "Polygon"
          },
        "properties" : { "description" : "",
            "fill" : "#1087bf",
            "fill-opacity" : 0.20000000000000001,
            "id" : "marker-huw041xg0",
            "stroke" : "#1087bf",
            "stroke-opacity" : 1,
            "stroke-width" : 4,
            "title" : "MIT"
          },
        "type" : "Feature"
      },
      { "geometry" : { "coordinates" : [ [ [ -71.08823776245117,
                    42.36647141605843
                  ],
                  [ -71.08892440795898,
                    42.377441423897224
                  ],
                  [ -71.06969833374023,
                    42.37325656024963
                  ],
                  [ -71.077165603637695,
                    42.36520308350574
                  ],
                  [ -71.08823776245117,
                    42.36647141605843
                  ]
                ] ],
            "type" : "Polygon"
          },
        "properties" : { "description" : "",
            "fill" : "#7ec9b1",
            "fill-opacity" : 0.5,
            "id" : "marker-huw05y881",
            "stroke" : "#a3e46b",
            "stroke-opacity" : 1,
            "stroke-width" : 4,
            "title" : "East Cambridge"
          },
        "type" : "Feature"
      },
      { "geometry" : { "coordinates" : [ [ [ -71.11587524414062,
                    42.36158819524629
                  ],
                  [ -71.10445976257324,
                    42.365329917913314
                  ],
                  [ -71.09596252441406,
                    42.36076371791946
                  ],
                  [ -71.10815048217773,
                    42.35359665158396
                  ],
                  [ -71.11536026000977,
                    42.35467493503867
                  ],
                  [ -71.11587524414062,
                    42.36158819524629
                  ]
                ] ],
            "type" : "Polygon"
          },
        "properties" : { "description" : "",
            "fill" : "#fa946e",
            "fill-opacity" : 0.5,
            "id" : "marker-huw07eu12",
            "stroke" : "#f5c272",
            "stroke-opacity" : 1,
            "stroke-width" : 4,
            "title" : "Riverside"
          },
        "type" : "Feature"
      },
      { "geometry" : { "coordinates" : [ [ [ -71.103858947753906,
                    42.36564700281194
                  ],
                  [ -71.09896659851074,
                    42.37211518540227
                  ],
                  [ -71.08875274658203,
                    42.36653483201389
                  ],
                  [ -71.09029769897461,
                    42.363046859398899
                  ],
                  [ -71.09501838684082,
                    42.36051003041157
                  ],
                  [ -71.103858947753906,
                    42.36564700281194
                  ]
                ] ],
            "type" : "Polygon"
          },
        "properties" : { "description" : "",
            "fill" : "#9c89cc",
            "fill-opacity" : 0.69999999999999996,
            "id" : "marker-huw08loz3",
            "stroke" : "#9c89cc",
            "stroke-opacity" : 1,
            "stroke-width" : 4,
            "title" : "Area Four"
          },
        "type" : "Feature"
      }
    ],
  "id" : "surrealestate.i63b6322",
  "type" : "FeatureCollection"
};

var mapSetup = function() {
  myLayer.setGeoJSON(geoJson);
  myLayer.on('mouseover', function(e) {
    e.layer.openPopup();
  });
  myLayer.on('mouseout', function(e) {
    e.layer.closePopup();
  });
}