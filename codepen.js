window.$docsify.plugins = [
    function (hook, vm) {
      hook.beforeEach(function (html) {
        var JSONstring;
            var form = document.getElementById('demo');
  
            if (form) {
             form.parentNode.removeChild(form);
            }

            var HTML = html.match(/```html\n(.*(?:\n(?!```$).*)*)\n```/gm);                  
            HTML = HTML[0].replace('```html\n', '').replace('\n```', '') || '';

            var CSS = html.match(/```css\n(.*(?:\n(?!```$).*)*)\n```/gm);
            CSS = CSS[0].replace('```css\n', '').replace('\n```', '') || '';

            var JS = html.match(/```js\n(.*(?:\n(?!```$).*)*)\n```/gm);
            JS = JS[0].replace('```js\n', '').replace('\n```', '') || '';

            var data = {
                html: HTML,
                css: CSS,
                js: JS,
                title                 : vm.route.file.toLowerCase().replace('.md', ''),
                description           : "Hands on demo for: " + vm.route.file.toLowerCase().replace('.md', ''),
                private               : false,
                editors               : "111",
                layout                : "top",
                html_pre_processor    : "none",
                css_pre_processor     : "none",
                css_prefix            : "neither",
                js_pre_processor      : "none",
                html_classes          : "loading",
                head                  : "<meta name='viewport' content='width=device-width'>",
                // css_external          : "http://yoursite.com/style.css", // semi-colon separate multiple files
                // js_external           : "http://yoursite.com/script.js" // semi-colon separate multiple files
            };
  
            // Quotes will screw up the JSON
           JSONstring = JSON.stringify(data).replace(/"/g, "&​quot;") .replace(/'/g, "&apos;");

           if (HTML.length || CSS.length || JS.length) {
            return html + '\n' +
            '<form action="https://codepen.io/pen/define" method="POST" target="_blank">' + 
              '<input type="hidden" name="data" value=\'' + JSONstring + '\'>' + 
              '<p>Open in Codepen.io:</p>' + 
              '<input type="image" src="cp-arrow-right.svg" width="40" height="40" value="Open in Codepen.io" class="codepen-mover-button">' +
            '</form>';
           }

           return html;
      });
    }
  ];
  