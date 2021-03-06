//The base URI that ARE runs at
export var _baseURI;

//A map holding the opened connection with ARE for SSE
export var _eventSourceMap = new Map();

//delimiter used for encoding
export var delimiter = "-";

//enumeration for server event types
export var ServerEventTypes = {
  MODEL_CHANGED: "model_changed",
  MODEL_STATE_CHANGED: "model_state_changed",
  EVENT_CHANNEL_TRANSMISSION: "event_channel_transmission",
  DATA_CHANNEL_TRANSMISSION: "data_channel_transmission",
  PROPERTY_CHANGED: "property_changed"
};

//Port datatypes
export var PortDatatype = {
  UNKNOWN: "unknown",
  BOOLEAN: "boolean",
  BYTE: "byte",
  CHAR: "char",
  INTEGER: "integer",
  DOUBLE: "double",
  STRING: "string"
};

//set the base uri (usually where ARE runs at)
export function setBaseURI(uri) {
  _baseURI = uri;
}

//encodes PathParametes
export function encodeParam(text) {
  encoded = "";
  for (i = 0; i < text.length; i++) {
    encoded += text.charCodeAt(i) + delimiter;
  }

  return encoded;
}

//replaces all occurrences of a 'oldString' with 'newString' in 'text'
export function replaceAll(text, oldString, newString) {
  return text.split(oldString).join(newString);
}

/**********************
 *	Runtime resources
 **********************/

export function downloadDeployedModel(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model",
    datatype: "text/xml",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function uploadModel(successCallback, errorCallback, modelInXML) {
  if (modelInXML == "") return;

  $.ajax({
    type: "PUT",
    url: _baseURI + "runtime/model",
    contentType: "text/xml", //content-type of the request
    data: modelInXML,
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function autorun(successCallback, errorCallback, filepath) {
  if (filepath == "") return;

  $.ajax({
    type: "PUT",
    url: _baseURI + "runtime/model/autorun/" + encodeParam(filepath),
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function pauseModel(successCallback, errorCallback) {
  $.ajax({
    type: "PUT",
    url: _baseURI + "runtime/model/state/pause",
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function startModel(successCallback, errorCallback) {
  $.ajax({
    type: "PUT",
    url: _baseURI + "runtime/model/state/start",
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function stopModel(successCallback, errorCallback) {
  $.ajax({
    type: "PUT",
    url: _baseURI + "runtime/model/state/stop",
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getModelState(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/state",
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function deployModelFromFile(successCallback, errorCallback, filepath) {
  if (filepath == "") return;

  $.ajax({
    type: "PUT",
    url: _baseURI + "runtime/model/" + encodeParam(filepath),
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getRuntimeComponentIds(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/components/ids",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getRuntimeComponentPropertyKeys(successCallback, errorCallback, componentId) {
  if (componentId == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/components/" + encodeParam(componentId),
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getRuntimeComponentProperty(successCallback, errorCallback, componentId, componentKey) {
  if (componentId == "" || componentKey == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/components/" + encodeParam(componentId) + "/" + encodeParam(componentKey),
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function setRuntimeComponentProperties(successCallback, errorCallback, propertyMap) {
  if (propertyMap == "") return;

  $.ajax({
    type: "PUT",
    url: _baseURI + "runtime/model/components/properties",
    contentType: "application/json",
    data: propertyMap,
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function setRuntimeComponentProperty(successCallback, errorCallback, componentId, componentKey, componentValue) {
  if (componentId == "" || componentKey == "" || componentValue == "") return;

  $.ajax({
    type: "PUT",
    url: _baseURI + "runtime/model/components/" + encodeParam(componentId) + "/" + encodeParam(componentKey),
    contentType: "text/plain",
    data: componentValue,
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getEventChannelsIds(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/channels/event/ids",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getEventChannelSource(successCallback, errorCallback, channelId) {
  if (channelId == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/channels/event/" + encodeParam(channelId) + "/source",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getEventChannelTarget(successCallback, errorCallback, channelId) {
  if (channelId == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/channels/event/" + encodeParam(channelId) + "/target",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getComponentEventChannelsIds(successCallback, errorCallback, componentId) {
  if (componentId == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/components/" + encodeParam(componentId) + "/channels/event/ids",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getDataChannelsIds(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/channels/data/ids",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getDataChannelSource(successCallback, errorCallback, channelId) {
  if (channelId == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/channels/data/" + encodeParam(channelId) + "/source",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getDataChannelTarget(successCallback, errorCallback, channelId) {
  if (channelId == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/channels/data/" + encodeParam(channelId) + "/target",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getComponentDataChannelsIds(successCallback, errorCallback, componentId) {
  if (componentId == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/components/" + encodeParam(componentId) + "/channels/data/ids",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getComponentInputPortIds(successCallback, errorCallback, componentId) {
  if (componentId == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/components/" + encodeParam(componentId) + "/ports/input/ids",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getComponentOutputPortIds(successCallback, errorCallback, componentId) {
  if (componentId == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/components/" + encodeParam(componentId) + "/ports/output/ids",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(jsonString, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getPortDatatype(successCallback, errorCallback, componentId, portId) {
  if (componentId == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "runtime/model/components/" + encodeParam(componentId) + "/ports/" + encodeParam(portId) + "/datatype",
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(jsonString, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

/*************************************
 *	Storage/ARE-repository resources
 *************************************/

export function downloadModelFromFile(successCallback, errorCallback, filepath) {
  if (filepath == "") return;

  $.ajax({
    type: "GET",
    url: _baseURI + "storage/models/" + encodeParam(filepath),
    datatype: "text/xml",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function storeModel(successCallback, errorCallback, filepath, modelInXML) {
  if (filepath == "" || modelInXML == "") return;

  $.ajax({
    type: "POST",
    url: _baseURI + "storage/models/" + encodeParam(filepath),
    contentType: "text/xml", //content-type of the request
    data: modelInXML,
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function deleteModelFromFile(successCallback, errorCallback, filepath) {
  if (filepath == "") return;

  $.ajax({
    type: "DELETE",
    url: _baseURI + "storage/models/" + encodeParam(filepath),
    datatype: "text",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(jqXHR.responseText, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function listStoredModels(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    url: _baseURI + "storage/models/names",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getComponentDescriptorsAsXml(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    url: _baseURI + "storage/components/descriptors/xml",
    datatype: "text/xml",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      successCallback(data, textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

export function getComponentDescriptorsAsJSON(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    url: _baseURI + "storage/components/descriptors/json",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonObject = JSON.parse(jqXHR.responseText);
      successCallback(jsonObject[0], textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

/**********************
 *	Other Functions
 **********************/

export function getRestFunctions(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    url: _baseURI + "restfunctions",
    datatype: "application/json",
    crossDomain: true,
    success: function(data, textStatus, jqXHR) {
      jsonString = jqXHR.responseText;
      successCallback(JSON.parse(jsonString), textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown, jqXHR.responseText);
    }
  });
}

/**********************************
 *	Subscription to SSE events
 **********************************/

export function subscribe(successCallback, errorCallback, eventType, channelId) {
  // Browser does not support SSE
  if (typeof EventSource === "undefined") {
    alert("SSE not supported by browser");
    return;
  }

  var eventSource = _eventSourceMap.get(eventType);
  if (eventSource != null) {
    eventSource.close();
  }

  switch (eventType) {
    case ServerEventTypes.MODEL_CHANGED:
      resource = "runtime/deployment/listener";
      break;
    case ServerEventTypes.MODEL_STATE_CHANGED:
      resource = "runtime/model/state/listener";
      break;
    case ServerEventTypes.EVENT_CHANNEL_TRANSMISSION:
      resource = "runtime/model/channels/event/listener";
      break;
    case ServerEventTypes.DATA_CHANNEL_TRANSMISSION:
      resource = "runtime/model/channels/data/" + encodeParam(channelId) + "/listener";
      break;
    case ServerEventTypes.PROPERTY_CHANGED:
      resource = "runtime/model/components/properties/listener";
      break;
    default:
      console.error("ERROR: Unknown event type given as a parameter '" + eventType + "'");
      return;
  }

  eventSource = new EventSource(_baseURI + resource); // Connecting to SSE service
  _eventSourceMap.add(eventType, eventSource);

  //adding listener for specific events
  eventSource.addEventListener(
    "event",
    function(e) {
      successCallback(e.data, 200);
    },
    false
  );

  // After SSE handshake constructed
  eventSource.onopen = function(e) {
    console.log("Waiting message...");
  };

  // Error handler
  eventSource.onerror = function(e) {
    switch (e.target.readyState) {
      case EventSource.CONNECTING:
        console.log(400, "reconnecting");
        errorCallback(400, "reconnecting");
        break;
      case EventSource.CLOSED:
        console.log(400, "connectionLost");
        errorCallback(400, "connectionLost");
        break;
      default:
        errorCallback(400, "someErrorOccurred");
        console.log("Error occured");
    }
  };
}

export function unsubscribe(eventType, channelId) {
  closeEventSource(eventType);
}

export function closeEventSource(eventType) {
  var eventSource = _eventSourceMap.remove(eventType);

  if (eventSource == null) {
    return false;
  } else {
    eventSource.close();
    return true;
  }
}
