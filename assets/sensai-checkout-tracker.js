(function (s, e, n, s, a, i) {s.sm = s.sm || {start: new Date().getTime()};s._smSettings = {id: i};var f = e.getElementsByTagName('head')[0],j = e.createElement('script');j.async = true;j.src = n+i+a+'?v='+s.sm.start;f.parentNode.insertBefore(j, f);})('', document, 'https://tracker.sensaimetrics.io/static/sensaiTracker-',window,'.js','SM-g7D7');
setTimeout(function() {
  try {
    var checkout = Shopify.checkout;

    /* Cart */
    var cartItems = [];
    if (checkout.line_items.length > 0) {
      var items = checkout.line_items;
      items.forEach(function(item) {
        cartItems.push({
          product_id: item.product_id,
          sku: item.sku,
          slug: item.sku,
          name: item.title,
          price: item.price,
          line_total: item.line_price,
          quantity: item.quantity,
          variation_id: item.variant_id
        });
      });
    }

    /* Shipping */
    var shipping_address = checkout.shipping_address;
    var shipping = {
      city: shipping_address.city,
      state: shipping_address.province,
      country: shipping_address.country,
      postcode: shipping_address.zip,
      customer_id: checkout.customer_id,
      customer_email: checkout.email
    };

    /* Billing */
    var billing_address = checkout.billing_address;
    var billing = {
      city: billing_address.city,
      state: billing_address.province,
      country: billing_address.country,
      postcode: billing_address.zip,
    };

    if (cartItems.length) {
      if (typeof sensai !== "undefined") {
        sensai.broadcast("purchase", {
          order_id: checkout.order_id,
          coupons: checkout.discount,
          total_shipping: checkout.shipping_rate,
          total: checkout.total_price,
          date: checkout.created_at,
          items: cartItems,
          shipping: shipping,
          billing: billing
        });
      }
    }
  } catch (err) {
    console.error("Sensai Metrics event pushing failed");
  }
}, 2000);
