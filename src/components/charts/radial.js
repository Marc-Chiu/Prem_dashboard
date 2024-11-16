import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";

export function radialChart(points) {

        const longitude = d3.scalePoint(new Set(Plot.valueof(points, "key")), [180, -180]).padding(0.5).align(1)
        return Plot.plot({
                width: 450,
                projection: {
                  type: "azimuthal-equidistant",
                  rotate: [0, -90],
                  // Note: 0.625° corresponds to max. length (here, 0.5), plus enough room for the labels
                  domain: d3.geoCircle().center([0, 90]).radius(1.35)()
                },
                color: "blue",
                marks: [
                  // grey discs
                  Plot.geo([1, 0.8, 0.6, 0.4, 0.2], {
                    geometry: (r) => d3.geoCircle().center([0, 90]).radius(r)(),
                    stroke: "black",
                    fill: "black",
                    strokeOpacity: 0.3,
                    fillOpacity: 0.03,
                    strokeWidth: 0.5
                  }),

                  // white axes
                  Plot.link(longitude.domain(), {
                    x1: longitude,
                    y1: 90 - 1,
                    x2: 0,
                    y2: 90,
                    stroke: "white",
                    strokeOpacity: 0.5,
                    strokeWidth: 2.5
                  }),

                  // tick labels
                  Plot.text([0.2, 0.4, 0.6, .8, 1], {
                    x: 180,
                    y: (d) => 90 - d,
                    dx: 2,
                    textAnchor: "start",
                    text: (d) => `${100 * d}%`,
                    fill: "currentColor",
                    stroke: "white",
                    fontSize: 8
                  }),

                  // axes labels
                  Plot.text(longitude.domain(), {
                    x: longitude,
                    y: 90 - 1.15,
                    text: Plot.identity,
                    lineWidth: 5
                  }),

                  // areas
                  Plot.area(points, {
                    x1: ({ key }) => longitude(key),
                    y1: ({ value }) => 90 - value,
                    x2: 0,
                    y2: 90,
                    fill: "blue",
                    stroke: "blue",
                    curve: "cardinal-closed"
                  }),

                  // points
                  Plot.dot(points, {
                    x: ({ key }) => longitude(key),
                    y: ({ value }) => 90 - value,
                    fill: "blue",
                    stroke: "white"
                  }),

                  // interactive labels
                  Plot.text(
                    points,
                    Plot.pointer({
                      x: ({ key }) => longitude(key),
                      y: ({ value }) => 90 - value,
                      text: (d) => `${(100 * d.value).toFixed(0)}%`,
                      textAnchor: "start",
                      dx: 4,
                      fill: "currentColor",
                      stroke: "white",
                      maxRadius: 10
                    })
                  )
                ]
              });
}
