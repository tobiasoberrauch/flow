import 'babel-polyfill';

import gulp from 'gulp';
import jest from 'gulp-jest';

gulp.task('jest', function () {
    var testConfig = {
        // "scriptPreprocessor": "./node_modules/babel-jest",
        // unmockedModulePathPatterns: [
        //     "node_modules/react"
        // ],
        testDirectoryName: "unit",
        // testPathIgnorePatterns: [
        //     "node_modules",
        //     "spec/support"
        // ],
        // moduleFileExtensions: [
        //     "js",
        //     "json"
        // ]
    };
    return gulp.src('test').pipe(jest(testConfig));
});