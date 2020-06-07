function openCodepen(id) {
  if (!window.pens) return;

  if (window.pens[id]) {
    const form = document.createElement('form');
    form.action = "https://codepen.io/pen/define";
    form.method = "POST";
    form.target = "_blank";
    const input = document.createElement('input');
    input.setAttribute('hidden', '');
    input.setAttribute('name', 'data');
    input.setAttribute('value', JSON.stringify(window.pens[id])) //.replace(/"/g, "&​quot;").replace(/'/g, "&apos;"));
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form)
  }
}
window.$docsify.plugins = [
  function (hook, vm) {
    hook.beforeEach(function (html) {
      debugger;
      var JSONstring;
      var demoRegion = html.match(/<codepen\-demo\s[^>]*>(.*?)<\/codepen\-demo>/gs);

      if (demoRegion && demoRegion.length) {
        window.pens = {}
        let newHtml = html;
        demoRegion.forEach((demo, i) => {
          var HTML = /```html\n(.*(?:\n(?!```$).*)*)\n```/gm.exec(demo);
          if (HTML && HTML.length) {
            HTML = HTML[0].replace('```html\n', '').replace('\n```', '') || '';
          }

          var CSS = /```css\n(.*(?:\n(?!```$).*)*)\n```/gm.exec(demo);
          if (CSS && CSS.length) {
            CSS = CSS.replace('```css\n', '').replace('\n```', '') || '';
          }

          var JS = /```js\n(.*(?:\n(?!```$).*)*)\n```/gm.exec(demo);
          if (JS && JS.length) {
            JS = JS[0].replace('```js\n', '').replace('\n```', '') || '';
          }


          // data-*
          const jsLink = /(data-js=")((?:(?!\/>|>|"|\'|\s).)+)/g.exec(demo);
          const cssLink = /(data-css=")((?:(?!\/>|>|"|\'|\s).)+)/g.exec(demo);

          var data = {
            html: HTML,
            css: CSS,
            js: JS,
            title: vm.route.file.toLowerCase().replace('.md', ''),
            description: "Hands on demo for: " + vm.route.file.toLowerCase().replace('.md', ''),
            private: false,
            editors: "111",
            layout: "top",
            html_pre_processor: "none",
            css_pre_processor: "none",
            css_prefix: "neither",
            js_pre_processor: "none",
            html_classes: "loading",
            head: "<meta name='viewport' content='width=device-width'>",
          };

          if (jsLink && jsLink.length === 3) {
            data.js_external = jsLink[2]
          }
          if (cssLink && cssLink.length === 3) {
            data.css_external = cssLink[2]
          }

          if (HTML.length || CSS.length || JS.length) {
            window.pens[i] = data;

            newHtml = newHtml.replace(demo, demo + '<button onclick="openCodepen(this.dataset.pen)" data-pen="' + i + '">Open in Codepen</button>');
          }
        });

        return newHtml;
      }
      return html;
    });
  }
];
