// import { Map } from "ol";
// import * as _Source from "ol/source";
// import * as _Control from "ol/control";
// import * as _Format from 'ol/format';
// let ol = window['ol'];

function mapToJSON(map) {
    // console.log(map, ol)
    let json = {};
    //获取视角
    json.view = map.getView().getProperties();
    //控制器
    let controls = map.getControls().getArray().map(control => {
        for (let key in ol.control) {
            if (key === 'defaults' || !key) continue;
            if (control instanceof (ol.control)[key] && key !== 'Control') {
                return key.toLowerCase();
            }
        }
        return
    });

    json.controls = { type: 'defaults' }
    controls.forEach(control => {
        if (control) {
            json.controls[control] = true;
        }
    });
    //图层
    //ts-ignore
    json.layers = layerToJson(map.getLayers().getArray());

    return json;
}

function layerToJson(layers) {
    let list = [];
    layers.forEach(layer => {
        let l = layer.getProperties()
        if (l.source instanceof ol.source.XYZ) {
            let config = {
                title: l.title,
                type: l.type,
                visible: l.visible,
                minZoom: l.minZoom,
                maxZoom: l.maxZoom,
                source: {
                    url: l.source.getUrls()?.[0],
                    type: 'xyz-source'
                }
            }
            if (config.minZoom === -Infinity) delete config.minZoom;
            if (config.maxZoom === Infinity) delete config.maxZoom;
            list.push(config);
        } else if (l.source instanceof ol.source.Vector) {
            let config = {
                title: l.title,
                type: l.type,
                visible: l.visible,
                minZoom: l.minZoom,
                maxZoom: l.maxZoom,
                source: {
                    url: l.source.getUrl(),
                    type: 'vector-source',
                    format: {
                        type: getFormat(l.source.getFormat())
                    }
                },
                style: removeEmpty(layer.getStyle())
            }

            if (config.minZoom === -Infinity) delete config.minZoom;
            if (config.maxZoom === Infinity) delete config.maxZoom;
            list.push(config);
        } else if (l.source instanceof ol.source.VectorTile) {
            let config = {
                title: l.title,
                type: l.type,
                visible: l.visible,
                minZoom: l.minZoom,
                maxZoom: l.maxZoom,
                source: {
                    url: l.source.getUrls()?.[0],
                    type: 'vectortile-source',
                    format: {
                        type: getFormat(l.source?.format_)
                    }
                },
                style: layer.getStyle()
            }

            if (typeof config.style === 'function') {
                config.style = removeEmpty(l.style1)
            } else {
                config.style = removeEmpty(config.style)
            }
            if (config.minZoom === -Infinity) delete config.minZoom;
            if (config.maxZoom === Infinity) delete config.maxZoom;
            list.push(config);
        } else if (l.source instanceof ol.source.TileWMS) {

        }
        else {

        }
    });
    return list;
}

function getFormat(format) {
    for (let key in ol.format) {
        if (key == 'default' || key == undefined || typeof ol.format[key] == 'object') continue;
        if (format instanceof (ol.format)[key] && format.constructor.name === (ol.format)[key].name) {
            return key.toLowerCase();
            // config.source.format = {
            //     type: key.toLowerCase()
            // }
        }
    }
}

//去除空属性和函数并把键名后的下划线去掉
function removeEmpty(_obj) {
    let obj = JSON.parse(JSON.stringify(_obj));
    for (let key in obj) {
        // if (key.indexOf('_') > -1) {
        //     obj[key.replace(/_/g, '')] = obj[key];
        //     delete obj[key];
        // }
        if (obj[key] === null || obj[key] === undefined || obj[key] === '' || typeof obj[key] === 'function') {
            delete obj[key];
        }
        if (typeof obj[key] === 'object') {
            obj[key] = removeEmpty(obj[key]);
        }
    }
    for (let key in obj) {
        if (key.indexOf('_') > -1) {
            obj[key.replace(/_/g, '')] = obj[key];
            delete obj[key];
        }
    }
    return obj;
}

//移除map中所有图层
function removeLayers(map) {

    let layers = map.getLayers().getArray();
    for (let i = layers.length - 1; i >= 0; i--) {
        map.removeLayer(layers[i]);
    }
}

(window).mapToJSON = mapToJSON;

window.mapFunctions = {
    mapToJSON,
    removeLayers
}

// export { mapToJSON, removeLayers };