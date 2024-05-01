export function drawLine(ctx, edges) {
    // Set the line color and width
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2

    // Start drawing the line
    ctx.beginPath()

    // Move to the first edge
    ctx.moveTo(edges[0].x, edges[0].y)

    // Draw the remaining edges
    for (let i = 1; i < edges.length; i++) {
        ctx.lineTo(edges[i].x, edges[i].y)
    }

    // Finish drawing the line
    ctx.stroke()
}

export function approximateCoordinates(number, coord) {
    const approximatedX = Math.round(coord.x / number) * number
    const approximatedY = Math.round(coord.y / number) * number

    return { x: approximatedX, y: approximatedY }
}

export function addIntermediatePoint(point1, point2) {
    const diffX = point1.x - point2.x
    const diffy = point1.y - point2.y
    let pointx = point1.x
    console.log({ diffX, diffy })

    // if (diffX < 0) {
    //     pointx = point2.x
    // }

    const point = { x: pointx, y: point2.y }
    return [point1, point, point2]
}
