/**
 * Condition Filter Configuration
 * Allows specifying an experimental condition to test locally via command-line argument
 */

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

/**
 * Parse command-line arguments to get the desired condition
 * Usage: node app.js --condition control_im
 *        node app.js -c control_im
 * @returns {string|null} The condition name, or null if not specified
 */
function getConditionFromArgs() {
    const args = process.argv.slice(2); // Skip 'node' and filename
    let condition = null;

    for (let i = 0; i < args.length; i++) {
        if ((args[i] === '--condition' || args[i] === '-c') && args[i + 1]) {
            condition = args[i + 1];
            break;
        }
    }

    return condition;
}

/**
 * Get all available conditions from environment
 * @returns {string[]} Array of condition names
 */
function getAvailableConditions() {
    if (process.env.EXP_CONDITIONS_NAMES) {
        return process.env.EXP_CONDITIONS_NAMES.split(',').map(c => c.trim());
    }
    return [];
}

/**
 * Validate if a condition exists in the available conditions
 * @param {string} condition - The condition to validate
 * @returns {boolean} True if condition exists, false otherwise
 */
function isValidCondition(condition) {
    const available = getAvailableConditions();
    return available.includes(condition);
}

/**
 * Initialize and display condition information
 * This should be called early in app startup
 */
function initializeConditions() {
    const requestedCondition = getConditionFromArgs();
    const availableConditions = getAvailableConditions();

    console.log('\n=== EXPERIMENTAL CONDITIONS ===');
    console.log(`Available conditions: ${availableConditions.join(', ')}`);

    if (requestedCondition) {
        if (isValidCondition(requestedCondition)) {
            console.log(`\n✓ Using condition: ${requestedCondition}`);
            process.env.OVERRIDE_CONDITION = requestedCondition;
            console.log('  All new users will be assigned this condition.');
        } else {
            console.log(`\n✗ ERROR: Invalid condition "${requestedCondition}"`);
            console.log(`  Valid options: ${availableConditions.join(', ')}`);
            process.exit(1);
        }
    } else {
        console.log('\nℹ  Tip: Use --condition or -c to specify a condition for testing');
        console.log('  Example: node app.js --condition control_im');
    }
    console.log('==============================\n');
}

function getOverrideCondition(req) {
    if (req && req.session && req.session.overrideCondition) {
        return req.session.overrideCondition;
    }
    return process.env.OVERRIDE_CONDITION || null;
}

function applyConditionOverride(user, req) {
    const overrideCondition = getOverrideCondition(req);
    if (overrideCondition && user) {
        user.experimentalCondition = overrideCondition;
    }
    return user;
}

function conditionOverrideMiddleware(req, res, next) {
    if (req.query.condition) {
        if (isValidCondition(req.query.condition)) {
            req.session.overrideCondition = req.query.condition;
        }
    }

    const overrideCondition = getOverrideCondition(req);
    if (overrideCondition) {
        res.locals.overrideCondition = overrideCondition;
        if (req.user) {
            req.user.experimentalCondition = overrideCondition;
        }
    }

    next();
}

module.exports = {
    getConditionFromArgs,
    getAvailableConditions,
    isValidCondition,
    initializeConditions,
    getOverrideCondition,
    applyConditionOverride,
    conditionOverrideMiddleware
};
