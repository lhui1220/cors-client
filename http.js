/**
 * send get request
 */
function get(settings) {
	settings.method = 'GET';
	request(settings);
}

/**
 * send post request
 */
function post(settings) {
	settings.method = 'POST';
	request(settings);
}

/**
 * send http request
 */
function request(settings) {
	//TODO： support activexobj
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function (xhr) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				if (settings.success) settings.success(xhr.responseText);
			} else {
				if (settings.error) settings.error(xhr.status);
			}
		}
	};
	xhr.open(settings.method, settings.url,settings.async ? settings.async : true);
	//setup headers if had
	for (var header in settings.headers) {
		xhr.setRequestHeader(header,settings.headers[header]);
	}
	xhr.send(formatData(settings));
}

function formatData(settings) {
	if (!settings.data) {
		return null;
	}
	var dataType = 'json'; //assume is json.
	if (dataType == 'json') {
		return JSON.stringify(settings.data);
	}
	return null;
}