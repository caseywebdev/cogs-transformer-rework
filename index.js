const rework = require('rework');

module.exports = ({file: {buffer, path}, options, options: {plugins}}) => {
  if (!plugins) plugins = [];
  if (!Array.isArray(plugins)) plugins = [plugins];
  const source = plugins.reduce((css, plugin) => {
    if (typeof plugin === 'string') plugin = {name: plugin};
    return css.use(require(plugin.name)(plugin.options));
  }, rework(buffer.toString(), {source: path})).toString(options);
  return {buffer: new Buffer(source)};
};
