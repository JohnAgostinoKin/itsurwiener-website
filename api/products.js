function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default function handler(req, res) {
  const { id, price, name } = req.query

  if (!id || !price || isNaN(Number(price))) {
    res.status(400).send('Invalid product')
    return
  }

  const safeId = escapeHtml(id)
  const safePrice = escapeHtml(price)
  const safeName = escapeHtml(name || id)

  const html = `<!DOCTYPE html>
<html><body>
  <button class="snipcart-add-item"
    data-item-id="${safeId}"
    data-item-price="${safePrice}"
    data-item-url="/api/products?id=${encodeURIComponent(id)}&price=${encodeURIComponent(price)}&name=${encodeURIComponent(name || id)}"
    data-item-name="${safeName}"
  >${safeName}</button>
</body></html>`

  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}