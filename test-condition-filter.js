#!/usr/bin/env node

/**
 * Quick test script to demonstrate the condition filter functionality
 * Run with: node test-condition-filter.js --condition control_im
 */

require('dotenv').config({ path: '.env' });
const conditionFilter = require('./config/conditionFilter');

console.log('Testing Condition Filter Module\n');

// Test 1: Get available conditions
console.log('Available conditions:');
console.log(conditionFilter.getAvailableConditions());

// Test 2: Parse command-line arguments
console.log('\nParsed condition from args:');
console.log(conditionFilter.getConditionFromArgs());

// Test 3: Validate conditions
console.log('\nValidation tests:');
console.log('Is "control_im" valid?', conditionFilter.isValidCondition('control_im'));
console.log('Is "invalid_condition" valid?', conditionFilter.isValidCondition('invalid_condition'));

// Test 4: Initialize (this will show the full output)
console.log('\nInitializing conditions:\n');
conditionFilter.initializeConditions();
