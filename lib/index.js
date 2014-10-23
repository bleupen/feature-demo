'use strict';

exports.config = function (plugin, opts, next) {
    console.log('here');
    plugin.plugins.datasource.feature({
        id: 'conversations',
        name: 'Conversate',
        decorate: function (datasource, next) {
            datasource.link('myco:conversations', './conversations');
            next(null, datasource);
        }
    });

    plugin.plugins.datasource.feature({
        id: 'drop-empty',
        name: 'Drop Empty Tables'
    });

    plugin.plugins.ext.on('collection.preSettings', function (collection) {
        if (collection.datasource.features.hasOwnProperty('drop-empty') && collection.rows === 0) {
            return false;
        }
    });

    plugin.route({
        path: '/api/datasources/{id}/conversations',
        method: 'get',
        handler: function (req, reply) {
            plugin.plugins.datasource.lookup(req.params.id, function (err, ds) {
                reply(null, { items: [
                    { author: req.app.user.displayName, message: 'hi there'},
                    { author: 'Joe', message: 'hey, hows it going?'},
                    { author: req.app.user.displayName, message: ds.name+' is a pretty cool datasource, huh?'}] });
            });
        }
    });

    next();
};