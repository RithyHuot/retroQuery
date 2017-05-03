# retroQuery

retroQuery is a JavaScript DOM interaction library inspired by jQuery. Using retroQuery, users can:
  * Select single or multiple DOM elements
  * Traverse and manipulate DOM elements
  * Build DOM elements
  * Create `DOMNodeCollection` objects from `HTMLElement`s
  * Queue functions until DOM is fully loaded
  * Perform AJAX requests

## Installation
To use retroQuery, download this repo and add `rQuery.js` in your source code.

```js
  <script src="lib/rQuery.js" type="text/javascript"> </script>
```

## API

### `each`
  * Iterates through the elements in a `DOMNodeCollection` and applies a callback function passed as an argument

  ```js
  this.each( element => {
    element.each(childElement => {
      element.appendChild(childElement.cloneNode(true));
    })
  ```

### `children`
  * Returns collection of all children of each node.

### `parent`
  * Returns a `DOMNodeCollection` of the `parent`s of each of the nodes.

### `html`
  * Returns the `innerHTML` for the first element in nthe `DOMNodeCollection` if no argument is given. If a string argument is given, changes the `innerHTML` of each `DOMNodeCollection` element to the string argument.

### `empty`
  * Empties the innerHTML of each `DOMNodeCollection` element

### `append`
  * Takes a single `HTMLElement`, `DOMNodeCollection`, or `string` argument and appends it to each `DOMNodeCollection` element.

### `remove`
  * This method clears out the content of all nodes in the internal array.


### `attr`
  * Takes either one (`attr(key)`) or two (`attr(key, value)`) arguments.  If given one argument, the method gets the value of the attribute given for the the first element in the `DOMNodeCollection`.  The method sets the attribute, given as the first argument, as the value, given as the second argument, for each `DOMNodeCollection` element.  

### `find`
  * Returns a `DOMNodeCollection` of all the nodes matching the selector passed in as an argument that are descendants of the nodes.

### `addClass`
  * Adds className to the DOM elements' class properties

### `removeClass`
  * Removes className from the DOM elements' class properties

### `toggleClass`
  * Toggles a class, given as an argument, for each `DOMNodeCollection` element.

### `on`
  * Adds event listener to each `DOMNodeCollection` element.  

  ```js
    $r(".removeButton").on('click', (e) => {
      $r(e.currentTarget).parent().remove();
    });
  ```

### `off`
  * Removes event listener from each `DOMNodeCollection` element.  

## AJAX

Sends HTTP Request and returns a `Promise` object.  Accepts a `Hash` object as an argument with any of the following attributes:
  * method (default: "GET"): HTTP Request method or type
  * url (default: window.location.href): URL for HTTP Request
  * success: success callback
  * error: error callback
  * contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8'): content type of HTTP Request


```js
$r.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www.form-urlencoded; charset=UTF-8',
    method: 'GET',
    url:'',
    success: () => {},
    errors: () => {},
    data: {}
  };

  options = $r.extend(defaults, options);
  options.method = options.method.toUpperCase();

  request.open(options.method, options.url, true);
  request.onload = e => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};
```
