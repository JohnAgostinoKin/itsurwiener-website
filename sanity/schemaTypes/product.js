// Snipcart product validation - returns HTML with product data attributes
export default function handler(req, res) {
  const { id, price, name } = req.query

  const html = `<!DOCTYPE html>
<html>
<head><title>Product Validation</title></head>
<body>
  <button
    class="snipcart-add-item"
    data-item-id="${id}"
    data-item-price="${price}"
    data-item-url="/api/products?id=${id}&price=${price}&name=${encodeURIComponent(name || id)}"
    data-item-name="${name || id}"
  >${name || id}</button>
</body>
</html>`

  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}
