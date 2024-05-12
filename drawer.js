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

export function calculateMovementType(coord1, coord2) {
    const diffX = coord1.x - coord2.x
    const diffY = coord1.y - coord2.y

    return {
        x: diffX,
        y: diffY
    }
}

export function compareCoordinates(coord1, coord2) {
    return coord1.x === coord2.x && coord1.y === coord2.y
}

export function addIntermediatePoint(point1, point2, variation = false) {
    const point = !variation
        ? { x: point1.x, y: point2.y }
        : { x: point2.x, y: point1.y }
    return [point1, point, point2]
}
