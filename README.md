
# To ICNS

**Site wrapper to convert images to icns.**  
Supports svg, png, jpg, gif, icns, ico, and hqx.  
You should not use this.

```sh
$ npm install --save to-icns
```

```js
import { convertToIcns } from 'to-icns';
convertToIcns(inputPath).then((outputPath) => {
  // Output dir will be the same. Just with the .icns extension.
  // If undefined if process failed or invalid input.
});
```
