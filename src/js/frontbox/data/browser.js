/**
 * Browser module
 * @return {object} transitionEvent
 */

module.exports = () => {

    /* Output data */
    var _ = {
        transitionEvent         : null,
    };

    /* Start module */
    const start = () => {

        /* Fill once variables */
        _.transitionEvent = getTransitionEvent();

        /* test-code */
        DEBUG.variable.refresh('browser');
        /* end-test-code */
    };

    /* Transition event */
    const getTransitionEvent = () => {
    
        const 
        element = document.createElement("getTransitionEvent"),
        transitions = {
          "transition"      : "transitionend",
          "OTransition"     : "oTransitionEnd",
          "MozTransition"   : "transitionend",
          "WebkitTransition": "webkitTransitionEnd"
        };

        for (const key in transitions) {
            if (element.style[key] !== undefined){
                return transitions[key];
            }
        }
    };

    /* test-code */
    DEBUG.variable.add('browser', _);
    /* end-test-code */

    start();

    return _;
};