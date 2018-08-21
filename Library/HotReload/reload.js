//module.exports = 
(function () {
    if (module.hot) {
        module.hot.addStatusHandler(function (status) {
            if (status === "prepare" ) {
                window.location.reload();
            }
        });

    }
    else{
        console.warn('hot reloading disabled');
    }
})();

import index from '../../_Source/index';