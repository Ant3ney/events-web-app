define({ "api": [
  {
    "type": "delete",
    "url": "/event/:id",
    "title": "Remove a event",
    "group": "Event",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 \n  {\n     \"message\": \"success\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Event",
    "name": "DeleteEventId"
  },
  {
    "type": "delete",
    "url": "/event/images",
    "title": "remove Images to Event",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "imageId",
            "optional": false,
            "field": "imageId",
            "description": "<p>for uniq image</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 \n  {\n     message:\"success\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Event",
    "name": "DeleteEventImages"
  },
  {
    "type": "get",
    "url": "/event/images",
    "title": "get Images to Event",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "eventId",
            "optional": false,
            "field": "eventid",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 \n  [{\n     imageId:\"5d54a649b2976426a30ce964s\",\n     imagePath:\"image url\"\n },{\n     imageId:\"5d54a649b2976426a30ce964s\",\n     imagePath:\"image url\"\n }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Event",
    "name": "GetEventImages"
  },
  {
    "type": "get",
    "url": "/events",
    "title": "List all Event",
    "group": "Event",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n   {\n    \"event\": [\n        {\n            \"_id\": \"5d4decb94f13403560a55baa\",\n            \"name\": \"kingss\",\n            \"addressLine_1\": \"sahsahs\",\n            \"addressLine_2\": \"\",\n            \"region\": \"sahvshas\",\n            \"city\": \"ahsvha\",\n            \"postCode\": \"asvash\",\n            \"eventStartDate\": \"asacgsc\",\n            \"eventEndDate\": \"asvahsvah\",\n            \"notes\": \"savhsavsha\",\n            \"status\": \"Pending\"\n        },\n        {\n            \"_id\": \"5d4dedb38dd532374ef40202\",\n            \"name\": \"kingss\",\n            \"addressLine_1\": \"sahsahs\",\n            \"addressLine_2\": \"\",\n            \"region\": \"sahvshas\",\n            \"city\": \"ahsvha\",\n            \"postCode\": \"asvash\",\n            \"eventStartDate\": \"asacgsc\",\n            \"eventEndDate\": \"asvahsvah\",\n            \"notes\": \"savhsavsha\",\n            \"status\": \"Pending\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Event",
    "name": "GetEvents"
  },
  {
    "type": "post",
    "url": "/event",
    "title": "Create event",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "name",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "addressLine_1",
            "optional": false,
            "field": "addressLine_1",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "addressLine_2",
            "optional": false,
            "field": "addressLine_2",
            "description": "<p>this is optional field</p>"
          },
          {
            "group": "Parameter",
            "type": "region",
            "optional": false,
            "field": "region",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "city",
            "optional": false,
            "field": "city",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "postCode",
            "optional": false,
            "field": "postCode",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "eventStartDate",
            "optional": false,
            "field": "eventStartDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "eventEndDate",
            "optional": false,
            "field": "eventEndDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "notes",
            "optional": false,
            "field": "notes",
            "description": "<p>this is optional field</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n   {\n    \"event\": {\n        \"_id\": \"5d4dee79beb4c738d2de6184\",\n        \"name\": \"kingss\",\n        \"addressLine_1\": \"sahsahs\",\n        \"addressLine_2\": \"\",\n        \"region\": \"sahvshas\",\n        \"city\": \"ahsvha\",\n        \"postCode\": \"asvash\",\n        \"eventStartDate\": \"asacgsc\",\n        \"eventEndDate\": \"asvahsvah\",\n        \"notes\": \"savhsavsha\",\n        \"status\": \"Pending\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Event",
    "name": "PostEvent"
  },
  {
    "type": "post",
    "url": "/event/images",
    "title": "Add Images to Event",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "image",
            "optional": false,
            "field": "form-data",
            "description": "<p>add single file object</p>"
          },
          {
            "group": "Parameter",
            "type": "eventId",
            "optional": false,
            "field": "event",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 \n  {\n     imageId:\"5d54a649b2976426a30ce964s\",\n     imagePath:\"image url\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Event",
    "name": "PostEventImages"
  },
  {
    "type": "put",
    "url": "/event/:id",
    "title": "update a event",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "name",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "addressLine_1",
            "optional": false,
            "field": "addressLine_1",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "addressLine_2",
            "optional": false,
            "field": "addressLine_2",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "region",
            "optional": false,
            "field": "region",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "city",
            "optional": false,
            "field": "city",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "postCode",
            "optional": false,
            "field": "postCode",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "eventStartDate",
            "optional": false,
            "field": "eventStartDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "eventEndDate",
            "optional": false,
            "field": "eventEndDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "notes",
            "optional": false,
            "field": "notes",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n {\n    \"event\": {\n        \"_id\": \"5d4dee79beb4c738d2de6184\",\n        \"name\": \"kingss\",\n        \"addressLine_1\": \"sahsahs\",\n        \"addressLine_2\": \"\",\n        \"region\": \"sahvshas\",\n        \"city\": \"ahsvha\",\n        \"postCode\": \"asvash\",\n        \"eventStartDate\": \"asacgsc\",\n        \"eventEndDate\": \"asvahsvah\",\n        \"notes\": \"savhsavsha\",\n        \"status\": \"Pending\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Update error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Event",
    "name": "PutEventId"
  }
] });
