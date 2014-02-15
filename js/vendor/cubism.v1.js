(function(a){function d(a){return a}function e(){}function j(a){return Math.floor(a/1e3)}function k(a){var b=a.indexOf("|"),c=a.substring(0,b),d=c.lastIndexOf(","),e=c.lastIndexOf(",",d-1),f=c.lastIndexOf(",",e-1),g=c.substring(f+1,e)*1e3,h=c.substring(d+1)*1e3;return a.substring(b+1).split(",").slice(1).map(function(a){return+a})}function l(a){if(!(a instanceof e))throw new Error("invalid context");this.context=a}function o(a,b){return function(c,d,e,f){a(new Date(+c+b),new Date(+d+b),e,f)}}function p(a,b){l.call(this,a),b=+b;var c=b+"";this.valueOf=function(){return b},this.toString=function(){return c}}function r(a,b){function c(b,c){if(c instanceof l){if(b.context!==c.context)throw new Error("mismatch context")}else c=new p(b.context,c);l.call(this,b.context),this.left=b,this.right=c,this.toString=function(){return b+" "+a+" "+c}}var d=c.prototype=Object.create(l.prototype);return d.valueAt=function(a){return b(this.left.valueAt(a),this.right.valueAt(a))},d.shift=function(a){return new c(this.left.shift(a),this.right.shift(a))},d.on=function(a,b){return arguments.length<2?this.left.on(a):(this.left.on(a,b),this.right.on(a,b),this)},function(a){return new c(this,a)}}function u(a){return a&16777214}function v(a){return(a+1&16777214)-1}function z(a){a.style("position","absolute").style("top",0).style("bottom",0).style("width","1px").style("pointer-events","none")}function A(a){return a+"px"}var b=a.cubism={version:"1.5.0"},c=0;b.option=function(a,c){var d=b.options(a);return d.length?d[0]:c},b.options=function(a,b){var c=location.search.substring(1).split("&"),d=[],e=-1,f=c.length,g;while(++e<f)(g=c[e].split("="))[0]==a&&d.push(decodeURIComponent(g[1]));return d.length||arguments.length<2?d:b},b.context=function(){function p(){var c=Date.now();return g=new Date(Math.floor((c-j-k)/b)*b),f=new Date(g-d*b),i=new Date(Math.floor((c-j)/b)*b),h=new Date(i-d*b),m.domain([f,g]),a}var a=new e,b=1e4,d=1440,f,g,h,i,j=5e3,k=5e3,l=d3.dispatch("prepare","beforechange","change","focus"),m=a.scale=d3.time.scale().range([0,d]),n,o;return a.start=function(){n&&clearTimeout(n);var c=+i+j-Date.now();return c<k&&(c+=b),n=setTimeout(function e(){i=new Date(Math.floor((Date.now()-j)/b)*b),h=new Date(i-d*b),l.prepare.call(a,h,i),setTimeout(function(){m.domain([f=h,g=i]),l.beforechange.call(a,h,i),l.change.call(a,h,i),l.focus.call(a,o)},k),n=setTimeout(e,b)},c),a},a.stop=function(){return n=clearTimeout(n),a},n=setTimeout(a.start,10),a.step=function(a){return arguments.length?(b=+a,p()):b},a.size=function(a){return arguments.length?(m.range([0,d=+a]),p()):d},a.serverDelay=function(a){return arguments.length?(j=+a,p()):j},a.clientDelay=function(a){return arguments.length?(k=+a,p()):k},a.focus=function(b){return l.focus.call(a,o=b),a},a.on=function(b,c){return arguments.length<2?l.on(b):(l.on(b,c),c!=null&&(/^prepare(\.|$)/.test(b)&&c.call(a,h,i),/^beforechange(\.|$)/.test(b)&&c.call(a,f,g),/^change(\.|$)/.test(b)&&c.call(a,f,g),/^focus(\.|$)/.test(b)&&c.call(a,o)),a)},d3.select(window).on("keydown.context-"+ ++c,function(){switch(!d3.event.metaKey&&d3.event.keyCode){case 37:o==null&&(o=d-1),o>0&&a.focus(--o);break;case 39:o==null&&(o=d-2),o<d-1&&a.focus(++o);break;default:return}d3.event.preventDefault()}),p()};var f=b.context.prototype=e.prototype;f.constant=function(a){return new p(this,+a)},f.cube=function(a){arguments.length||(a="");var b={},c=this;return b.metric=function(b){return c.metric(function(c,d,e,f){d3.json(a+"/1.0/metric"+"?expression="+encodeURIComponent(b)+"&start="+g(c)+"&stop="+g(d)+"&step="+e,function(a){if(!a)return f(new Error("unable to load data"));f(null,a.map(function(a){return a.value}))})},b+="")},b.toString=function(){return a},b};var g=d3.time.format.iso;f.librato=function(a,c){function f(a){enable_log&&console.log(a)}function g(a,b,c){f("---------------------- Starting request"),f("START: "+new Date(a*1e3)),f("STOP : "+new Date(b*1e3)),f("STEP : "+c);var d=(b-a)/c;f("# of measurements necessary: "+d)}function j(a){var b=avail_rsts[0],c=avail_rsts[avail_rsts.length];if(a>=c)return c;if(a<=b)return b;var d,e,f;for(f=a;f<=c;f++){d=avail_rsts.indexOf(f);if(d>-1){e=avail_rsts[d];break}}var g;for(f=a;f>=b;f--){d=avail_rsts.indexOf(f);if(d>-1){g=avail_rsts[d];break}}return e-a<a-g?e:g}function k(a,b,c){var d=b-a,e=2419200,f=604800,g=172800,h;return d>e?3600:(h=j(c),d>f&&h<900?900:d>g&&h<60?60:h)}var d={},e=this;auth_string="Basic "+btoa(a+":"+c),enable_log=!0,avail_rsts=[1,60,900,3600];var l=function(a,c){function e(b,c,e){var h="start_time="+b+"&end_time="+c+"&resolution="+k(b,c,e);return full_url=d+"/"+a+"?"+h,f("full_url = "+full_url),g(b,c,e),full_url}function h(a,b,c,d){var e=[];for(i=a;i<=b;i+=c){var f=[];while(d.length&&d[0].measure_time<=i)f.push(d.shift().value);var g;f.length?g=f.reduce(function(a,b){return a+b})/f.length:g=e.length?e[e.length-1]:0,e.push(g)}return e}var d="https://metrics-api.librato.com/v1/metrics";return request={},request.fire=function(a,d,g,i){function k(l){d3.json(l).header("X-Requested-With","XMLHttpRequest").header("Authorization",auth_string).header("Librato-User-Agent","cubism/"+b.version).get(function(b,l){if(!b){f("# of partial measurements: "+l.measurements[c].length),l.measurements[c].forEach(function(a){j.push(a)});var m="query"in l&&"next_time"in l.query;if(m)f("Requesting more values"),k(e(l.query.next_time,d,g));else{f("total number of measurements from librato: "+j.length);var n=h(a,d,g,j);f("number of measurements after adjusting time values: "+n.length),i(n)}}else f("There was an error when performing the librato request:"),f(b)})}var j=[];k(e(a,d,g))},request};return d.metric=function(a,b){return e.metric(function(c,d,e,f){l(a,b).fire(h(c),h(d),h(e),function(a){f(null,a)})},a+="")},d.toString=function(){return"librato"},d};var h=function(a){return Math.floor(a/1e3)};f.graphite=function(a){arguments.length||(a="");var b={},c=this;return b.metric=function(b){var d="sum",e=c.metric(function(c,e,f,g){var h=b;f!==1e4&&(h="summarize("+h+",'"+(f%36e5?f%6e4?f/1e3+"sec":f/6e4+"min":f/36e5+"hour")+"','"+d+"')"),d3.text(a+"/render?format=raw"+"&target="+encodeURIComponent("alias("+h+",'')")+"&from="+j(c-2*f)+"&until="+j(e-1e3),function(a){if(!a)return g(new Error("unable to load data"));g(null,k(a))})},b+="");return e.summarize=function(a){return d=a,e},e},b.find=function(b,c){d3.json(a+"/metrics/find?format=completer"+"&query="+encodeURIComponent(b),function(a){if(!a)return c(new Error("unable to find metrics"));c(null,a.metrics.map(function(a){return a.path}))})},b.toString=function(){return a},b},f.gangliaWeb=function(a){var b="",c="/ganglia2/";arguments.length&&(a.host&&(b=a.host),a.uriPathPrefix&&(c=a.uriPathPrefix,c[0]!="/"&&(c="/"+c),c[c.length-1]!="/"&&(c+="/")));var d={},e=this;return d.metric=function(a){var d=a.clusterName,f=a.metricName,g=a.hostName,h=a.isReport||!1,i=a.titleGenerator||function(a){return"clusterName:"+d+" metricName:"+f+(g?" hostName:"+g:"")},j=a.onChangeCallback,k=h?"g":"m",l=e.metric(function(a,e,h,i){function j(){return"c="+d+"&"+k+"="+f+(g?"&h="+g:"")+"&cs="+a/1e3+"&ce="+e/1e3+"&step="+h/1e3+"&graphlot=1"}d3.json(b+c+"graph.php?"+j(),function(a){if(!a)return i(new Error("Unable to fetch GangliaWeb data"));i(null,a[0].data)})},i(a));return l.toString=function(){return i(a)},j&&l.on("change",j),l},d.toString=function(){return b+c},d};var m=l.prototype;b.metric=l,m.valueAt=function(){return NaN},m.alias=function(a){return this.toString=function(){return a},this},m.extent=function(){var a=0,b=this.context.size(),c,d=Infinity,e=-Infinity;while(++a<b)c=this.valueAt(a),c<d&&(d=c),c>e&&(e=c);return[d,e]},m.on=function(a,b){return arguments.length<2?null:this},m.shift=function(){return this},m.on=function(){return arguments.length<2?null:this},f.metric=function(a,b){function r(b,c){var d=Math.min(j,Math.round((b-g)/i));if(!d||q)return;q=!0,d=Math.min(j,d+n);var f=new Date(c-d*i);a(f,c,i,function(a,b){q=!1;if(a)return console.warn(a);var d=isFinite(g)?Math.round((f-g)/i):0;for(var h=0,j=b.length;h<j;++h)k[h+d]=b[h];m.change.call(e,g,c)})}function s(a,b){isFinite(g)||(g=a),k.splice(0,Math.max(0,Math.min(j,Math.round((a-g)/i)))),g=a,h=b}var d=this,e=new l(d),f=".metric-"+ ++c,g=-Infinity,h,i=d.step(),j=d.size(),k=[],m=d3.dispatch("change"),p=0,q;return e.valueAt=function(a){return k[a]},e.shift=function(b){return d.metric(o(a,+b))},e.on=function(a,b){return arguments.length?(b==null?m.on(a)!=null&&--p==0&&d.on("prepare"+f,null).on("beforechange"+f,null):m.on(a)==null&&++p==1&&d.on("prepare"+f,r).on("beforechange"+f,s),m.on(a,b),b!=null&&/^change(\.|$)/.test(a)&&b.call(d,g,h),e):m.on(a)},arguments.length>1&&(e.toString=function(){return b}),e};var n=6,q=p.prototype=Object.create(l.prototype);q.valueAt=function(){return+this},q.extent=function(){return[+this,+this]},m.add=r("+",function(a,b){return a+b}),m.subtract=r("-",function(a,b){return a-b}),m.multiply=r("*",function(a,b){return a*b}),m.divide=r("/",function(a,b){return a/b}),f.horizon=function(){function o(o){o.on("mousemove.horizon",function(){a.focus(Math.round(d3.mouse(this)[0]))}).on("mouseout.horizon",function(){a.focus(null)}),o.append("canvas").attr("width",f).attr("height",g),o.append("span").attr("class","title").text(k),o.append("span").attr("class","value"),o.each(function(k,o){function B(c,d){w.save();var i=r.extent();A=i.every(isFinite),t!=null&&(i=t);var j=0,k=Math.max(-i[0],i[1]);if(this===a){if(k==y){j=f-n;var l=(c-u)/v;if(l<f){var m=e.getContext("2d");m.clearRect(0,0,f,g),m.drawImage(w.canvas,l,0,f-l,g,0,0,f-l,g),w.clearRect(0,0,f,g),w.drawImage(m.canvas,0,0)}}u=c}h.domain([0,y=k]),w.clearRect(j,0,f-j,g);var o;for(var p=0;p<z;++p){w.fillStyle=s[z+p];var q=(p-z+1)*g;h.range([z*g+q,q]),q=h(0);for(var x=j,B=f,C;x<B;++x){C=r.valueAt(x);if(C<=0){o=!0;continue}if(C===undefined)continue;w.fillRect(x,C=h(C),1,q-C)}}if(o){b==="offset"&&(w.translate(0,g),w.scale(1,-1));for(var p=0;p<z;++p){w.fillStyle=s[z-1-p];var q=(p-z+1)*g;h.range([z*g+q,q]),q=h(0);for(var x=j,B=f,C;x<B;++x){C=r.valueAt(x);if(C>=0)continue;w.fillRect(x,h(-C),1,q-h(-C))}}}w.restore()}function C(a){a==null&&(a=f-1);var b=r.valueAt(a);x.datum(b).text(isNaN(b)?null:l)}var p=this,q=++c,r=typeof i=="function"?i.call(p,k,o):i,s=typeof m=="function"?m.call(p,k,o):m,t=typeof j=="function"?j.call(p,k,o):j,u=-Infinity,v=a.step(),w=d3.select(p).select("canvas"),x=d3.select(p).select(".value"),y,z=s.length>>1,A;w.datum({id:q,metric:r}),w=w.node().getContext("2d"),a.on("change.horizon-"+q,B),a.on("focus.horizon-"+q,C),r.on("change.horizon-"+q,function(a,b){B(a,b),C(),A&&r.on("change.horizon-"+q,d)})})}var a=this,b="offset",e=document.createElement("canvas"),f=e.width=a.size(),g=e.height=30,h=d3.scale.linear().interpolate(d3.interpolateRound),i=d,j=null,k=d,l=d3.format(".2s"),m=["#08519c","#3182bd","#6baed6","#bdd7e7","#bae4b3","#74c476","#31a354","#006d2c"];return o.remove=function(b){function c(b){b.metric.on("change.horizon-"+b.id,null),a.on("change.horizon-"+b.id,null),a.on("focus.horizon-"+b.id,null)}b.on("mousemove.horizon",null).on("mouseout.horizon",null),b.selectAll("canvas").each(c).remove(),b.selectAll(".title,.value").remove()},o.mode=function(a){return arguments.length?(b=a+"",o):b},o.height=function(a){return arguments.length?(e.height=g=+a,o):g},o.metric=function(a){return arguments.length?(i=a,o):i},o.scale=function(a){return arguments.length?(h=a,o):h},o.extent=function(a){return arguments.length?(j=a,o):j},o.title=function(a){return arguments.length?(k=a,o):k},o.format=function(a){return arguments.length?(l=a,o):l},o.colors=function(a){return arguments.length?(m=a,o):m},o},f.comparison=function(){function o(o){o.on("mousemove.comparison",function(){a.focus(Math.round(d3.mouse(this)[0]))}).on("mouseout.comparison",function(){a.focus(null)}),o.append("canvas").attr("width",b).attr("height",e),o.append("span").attr("class","title").text(j),o.append("span").attr("class","value primary"),o.append("span").attr("class","value change"),o.each(function(j,o){function B(c,d){x.save(),x.clearRect(0,0,b,e);var g=r.extent(),h=s.extent(),i=t==null?g:t;f.domain(i).range([e,0]),A=g.concat(h).every(isFinite);var j=c/a.step()&1?v:u;x.fillStyle=m[2];for(var k=0,l=b;k<l;++k){var o=f(r.valueAt(k)),p=f(s.valueAt(k));o<p&&x.fillRect(j(k),o,1,p-o)}x.fillStyle=m[0];for(k=0;k<l;++k){var o=f(r.valueAt(k)),p=f(s.valueAt(k));o>p&&x.fillRect(j(k),p,1,o-p)}x.fillStyle=m[3];for(k=0;k<l;++k){var o=f(r.valueAt(k)),p=f(s.valueAt(k));o<=p&&x.fillRect(j(k),o,1,n)}x.fillStyle=m[1];for(k=0;k<l;++k){var o=f(r.valueAt(k)),p=f(s.valueAt(k));o>p&&x.fillRect(j(k),o-n,1,n)}x.restore()}function C(a){a==null&&(a=b-1);var c=r.valueAt(a),d=s.valueAt(a),e=(c-d)/d;y.datum(c).text(isNaN(c)?null:k),z.datum(e).text(isNaN(e)?null:l).attr("class","value change "+(e>0?"positive":e<0?"negative":""))}function D(a,b){B(a,b),C(),A&&(r.on("change.comparison-"+q,d),s.on("change.comparison-"+q,d))}var p=this,q=++c,r=typeof g=="function"?g.call(p,j,o):g,s=typeof h=="function"?h.call(p,j,o):h,t=typeof i=="function"?i.call(p,j,o):i,w=d3.select(p),x=w.select("canvas"),y=w.select(".value.primary"),z=w.select(".value.change"),A;x.datum({id:q,primary:r,secondary:s}),x=x.node().getContext("2d"),r.on("change.comparison-"+q,D),s.on("change.comparison-"+q,D),a.on("change.comparison-"+q,B),a.on("focus.comparison-"+q,C)})}var a=this,b=a.size(),e=120,f=d3.scale.linear().interpolate(d3.interpolateRound),g=function(a){return a[0]},h=function(a){return a[1]},i=null,j=d,k=s,l=t,m=["#9ecae1","#225b84","#a1d99b","#22723a"],n=1.5;return o.remove=function(b){function c(b){b.primary.on("change.comparison-"+b.id,null),b.secondary.on("change.comparison-"+b.id,null),a.on("change.comparison-"+b.id,null),a.on("focus.comparison-"+b.id,null)}b.on("mousemove.comparison",null).on("mouseout.comparison",null),b.selectAll("canvas").each(c).remove(),b.selectAll(".title,.value").remove()},o.height=function(a){return arguments.length?(e=+a,o):e},o.primary=function(a){return arguments.length?(g=a,o):g},o.secondary=function(a){return arguments.length?(h=a,o):h},o.scale=function(a){return arguments.length?(f=a,o):f},o.extent=function(a){return arguments.length?(i=a,o):i},o.title=function(a){return arguments.length?(j=a,o):j},o.formatPrimary=function(a){return arguments.length?(k=a,o):k},o.formatChange=function(a){return arguments.length?(l=a,o):l},o.colors=function(a){return arguments.length?(m=a,o):m},o.strokeWidth=function(a){return arguments.length?(n=a,o):n},o};var s=d3.format(".2s"),t=d3.format("+.0%");f.axis=function(){function g(e){var h=++c,i,j=e.append("svg").datum({id:h}).attr("width",a.size()).attr("height",Math.max(28,-g.tickSize())).append("g").attr("transform","translate(0,"+(d.orient()==="top"?27:4)+")").call(d);a.on("change.axis-"+h,function(){j.call(d),i||(i=d3.select(j.node().appendChild(j.selectAll("text").node().cloneNode(!0))).style("display","none").text(null))}),a.on("focus.axis-"+h,function(a){if(i)if(a==null)i.style("display","none"),j.selectAll("text").style("fill-opacity",null);else{i.style("display",null).attr("x",a).text(f(b.invert(a)));var c=i.node().getComputedTextLength()+6;j.selectAll("text").style("fill-opacity",function(d){return Math.abs(b(d)-a)<c?0:1})}})}var a=this,b=a.scale,d=d3.svg.axis().scale(b),e=a.step()<6e4?w:a.step()<864e5?x:y,f=e;return g.remove=function(b){function c(b){a.on("change.axis-"+b.id,null),a.on("focus.axis-"+b.id,null)}b.selectAll("svg").each(c).remove()},g.focusFormat=function(a){return arguments.length?(f=a==null?e:a,g):f==e?null:a},d3.rebind(g,d,"orient","ticks","tickSubdivide","tickSize","tickPadding","tickFormat")};var w=d3.time.format("%I:%M:%S %p"),x=d3.time.format("%I:%M %p"),y=d3.time.format("%B %d");f.rule=function(){function e(d){var e=++c,f=d.append("div").datum({id:e}).attr("class","line").call(z);d.each(function(e,f){function j(b,c){var e=[];for(var f=0,g=a.size();f<g;++f)i.valueAt(f)&&e.push(f);var h=d.selectAll(".metric").data(e);h.exit().remove(),h.enter().append("div").attr("class","metric line").call(z),h.style("left",A)}var g=this,h=++c,i=typeof b=="function"?b.call(g,e,f):b;if(!i)return;a.on("change.rule-"+h,j),i.on("change.rule-"+h,j)}),a.on("focus.rule-"+e,function(a){f.datum(a).style("display",a==null?"none":null).style("left",a==null?null:A)})}var a=this,b=d;return e.remove=function(b){function c(b){a.on("focus.rule-"+b.id,null)}b.selectAll(".line").each(c).remove()},e.metric=function(a){return arguments.length?(b=a,e):b},e}})(this);