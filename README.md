MODM
====

Mongodb Object Document Mapper

## Example

```js
var modm = require('modm');

// define a schema
schema = new modm.Schema({field: String});

// create db connection
model = modm('myDb', {
    host: '127.0.0.1',
    port: 27017,
    server: {pooSize: 5},
    db: {w: 1}
});

// get a collection
myCollection = model('myCollection', schema);

// db operations
myCollection.insert({data: 1}, function (err, item) {
   //...
});

// connect first, otherwise find will return undefined
// instead of a cursor.
model.connect(function (err, db) {
    var cursor = myCollection.find({/*query*/});
    cursor.toArray(function () {
        //...
    });
});

// ..or access the cursor in the callback
myCollection.find({/*query*/}, function (err, cursor) {
    cursor.toArray(function () {
        //...
    });
});
```

## Info
Results of atomic operations are not validated.

## Schema options

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Example</th>
            <th>Description</th>
        </tr>
    </thdead>
    <tbody>
        <tr>
            <td><code>type</code></td>
            <td><code>"string"</code></td>
            <td>Possible values: <code>"Array"</code>, <code>"Boolean"</code>, <code>"Buffer"</code>, <code>"Date"</code>, <code>"Number"</code>, <code>"Object"</code>, <code>"ObjectID"</code></td>
        </tr>
        <tr>
            <td><code>required</code></td>
            <td><code>true</code></td>
            <td>Possible values: <code>true</code>, <code>false</code></td>
        </tr>
        <tr>
            <td><code>default</code></td>
            <td><code>"this is a string default value"</code></td>
            <td>The default value. Can by any type of data.</td>
        </tr>
        <tr>
            <td><code>validate</code></td>
            <td><code>function () {}</code></td>
            <td>Validate function</td>
        </tr>
        <tr>
            <td><code>manipulate</code></td>
            <td><code>function () {}</code></td>
            <td>Manipulate function</td>
        </tr>
        <tr>
            <td><code>pre</code></td>
            <td><code>"my prefix "</code></td>
            <td>A string to prefix the value</td>
        </tr>
        <tr>
            <td><code>post</code></td>
            <td><code>" my suffix"</code></td>
            <td>A string to suffix the value</td>
        </tr>
        <tr>
            <td><code>charStyle</code></td>
            <td><code>"normal"</code></td>
            <td>Possible values: <code>"normal"</code>, <code>"uppercase"</code>, <code>"lowercase"</code></td>
        </tr>
        <tr>
            <td><code>parse</code></td>
            <td><code>DD.MM.YYY</code></td>
            <td>For `date` types only. A string value passed if available to the Moment.js date parser.</td>
        </tr>
        <tr>
            <td><code>trim</code></td>
            <td><code>true</code></td>
            <td>Boolean value. Trim or not?</td>
        </tr>
        <tr>
            <td><code>maxLength</code></td>
            <td><code>5</code></td>
            <td>Max length. Integer.</td>
        </tr>
        <tr>
            <td><code>minLength</code></td>
            <td><code>1</code></td>
            <td>Min length. Integer.</td>
        </tr>
        <tr>
            <td><code>max</code></td>
            <td><code>5</code></td>
            <td>number</td>
        </tr>
        <tr>
            <td><code>min</code></td>
            <td><code>-3</code></td>
            <td>number</td>
        </tr>
        <tr>
            <td><code>live</code></td>
            <td><code>true</code></td>
            <td>Boolean value: <code>true</code> or <code>false</code>. Not yet implemented</td>
        </tr>
    </tbody>
</table>

## License

"THE BEER-WARE LICENSE" (Revision 42):

adrian@ottiker.com wrote this code. As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return.
