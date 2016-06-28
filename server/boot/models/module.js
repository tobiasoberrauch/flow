module.exports = function (app) {
    var Module = app.models.Module;
    var SpaceModule = app.models.SpaceModule;

    //Module.create({
    //    label: 'Kalender',
    //    view: 'module/grolba/calendar/view/index.html',
    //    controller: 'grolba.calendar.IndexController',
    //    model: 'Event',
    //    config: [
    //        {
    //            key: 'label',
    //            type: 'input',
    //            templateOptions: {
    //                label: 'Bezeichnung'
    //            }
    //        },
    //        {
    //            key: 'slug',
    //            type: 'input',
    //            templateOptions: {
    //                label: 'Url'
    //            }
    //        },
    //        {
    //            key: 'height',
    //            type: 'input',
    //            defaultValue: '450',
    //            templateOptions: {
    //                label: 'Höhe vom Kalender in pixel'
    //            }
    //        },
    //        {
    //            key: 'editable',
    //            type: 'checkbox',
    //            defaultValue: true,
    //            templateOptions: {
    //                label: 'Kalender editierbar'
    //            }
    //        },
    //        {
    //            key: 'header',
    //            type: 'textarea',
    //            defaultValue: JSON.stringify({
    //                left: 'prev',
    //                center: 'title',
    //                right: 'next'
    //            }),
    //            templateOptions: {
    //                label: 'Kopfbereich'
    //            }
    //        }
    //    ]
    //}, function (err, module) {
    //    SpaceModule.create({
    //        moduleId: module.id,
    //        name: 'module.meinetermine',
    //        label: 'Meine Termine',
    //        slug: 'meinetermine'
    //    });
    //});
};