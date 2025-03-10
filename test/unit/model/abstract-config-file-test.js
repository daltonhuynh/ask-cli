const { expect } = require('chai');
const sinon = require('sinon');
const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');

const ConfigFile = require('@src/model/abstract-config-file');
const yaml = require('@src/model/yaml-parser');

describe('Model test - abstract config file test', () => {
    const FIXTURE_PATH = path.join(process.cwd(), 'test', 'unit', 'fixture', 'model');
    const JSON_CONFIG_PATH = path.join(FIXTURE_PATH, 'json-config.json');
    const YAML_CONFIG_PATH = path.join(FIXTURE_PATH, 'json-config-yaml.yaml');

    describe('# inspect correctness for constructor and content loading', () => {
        const NOT_EXISTING_CONFIG_PATH = path.join(FIXTURE_PATH, 'out-of-noWhere.json');
        const INVALID_JSON_CONFIG_PATH = path.join(FIXTURE_PATH, 'invalid-json.json');
        const INVALID_YAML_CONFIG_PATH = path.join(FIXTURE_PATH, 'invalid-yaml.yaml');
        const NOT_SUPPORTED_FILE_PATH = path.join(FIXTURE_PATH, 'unsupported-file-type.notsupport');

        it('| init with valid JSON file path, expect to create a ConfigFile instance successfully', () => {
            let configContent, jsonContent;
            try {
                // call
                configContent = new ConfigFile(JSON_CONFIG_PATH);
                jsonContent = jsonfile.readFileSync(JSON_CONFIG_PATH);
            } catch (err) {
                expect(err).equal(null);
            }
            // verify
            expect(configContent).to.be.instanceOf(ConfigFile);
            expect(configContent.fileType).equal('JSON');
            expect(configContent.content).deep.eq(jsonContent);
        });

        it('| init with valid YAML file path, expect to create a ConfigFile instance successfully', () => {
            let yamlContent, jsonContent;
            try {
                // call
                yamlContent = new ConfigFile(YAML_CONFIG_PATH);
                jsonContent = jsonfile.readFileSync(JSON_CONFIG_PATH);
            } catch (err) {
                expect(err).equal(null);
            }
            // verify
            expect(yamlContent).to.be.instanceOf(ConfigFile);
            expect(yamlContent.fileType).equal('YAML');
            expect(yamlContent.content).deep.eq(jsonContent);
        });

        it('| init with a file path not existing, expect correct error message thrown', () => {
            try {
                // call
                new ConfigFile(NOT_EXISTING_CONFIG_PATH);
                throw new Error('No error caught but supposed to throw an error when new.');
            } catch (err) {
                // verify
                const expectedError = `File ${NOT_EXISTING_CONFIG_PATH} not exists.`;
                expect(err).to.match(new RegExp(expectedError));
            }
        });

        it('| init with a file path without access permission, expect correct error message thrown', () => {
            // setup
            fs.chmodSync(JSON_CONFIG_PATH, 0o111);
            try {
                // call
                new ConfigFile(JSON_CONFIG_PATH);
                throw new Error('No error caught but supposed to throw an error when new.');
            } catch (err) {
                // verify
                const expectedError = `No access to read/write file ${JSON_CONFIG_PATH}.`;
                expect(err).to.match(new RegExp(expectedError));
            } finally {
                // clear
                fs.chmodSync(JSON_CONFIG_PATH, 0o644);
            }
        });

        it('| init with an invalid json file, expect correct error message thrown', () => {
            try {
                new ConfigFile(INVALID_JSON_CONFIG_PATH);
                throw new Error('No error caught but supposed to throw an error when new.');
            } catch (err) {
                const expectedError = `Failed to parse JSON file ${INVALID_JSON_CONFIG_PATH}.`;
                expect(err).to.match(new RegExp(expectedError));
            }
        });

        it('| init with an invalid yaml file, expect correct error message thrown', () => {
            try {
                new ConfigFile(INVALID_YAML_CONFIG_PATH);
                throw new Error('No error caught but supposed to throw an error when new.');
            } catch (err) {
                const expectedError = `Failed to parse YAML file ${INVALID_YAML_CONFIG_PATH}.`;
                expect(err).to.match(new RegExp(expectedError));
            }
        });

        it('| init with a non-supported file type, expect correct error message thrown', () => {
            try {
                new ConfigFile(NOT_SUPPORTED_FILE_PATH);
                throw new Error('No error caught but supposed to throw an error when new.');
            } catch (err) {
                expect(err.message).to.equal(`File type for ${NOT_SUPPORTED_FILE_PATH} is not supported. Only JSON and YAML files are supported.`);
            }
        });
    });

    describe('# inspect correctness for getProperty method', () => {
        const json = new ConfigFile(JSON_CONFIG_PATH);

        [
            {
                testCase: 'get property value at first level correctly',
                input: ['simpleKey'],
                expectation: 'simpleValue'
            },
            {
                testCase: 'get property value in an object correctly',
                input: ['objectField', 'internalKey'],
                expectation: 'internalValue'
            },
            {
                testCase: 'get property value in an array correctly',
                input: ['arrayField', 1],
                expectation: 2
            },
            {
                testCase: 'get property value in nested level correctly',
                input: ['nested', 'innerArray', 0, 'innerKey'],
                expectation: 'treasure'
            },
            {
                testCase: 'get property value which does not exist',
                input: ['nested', 5],
                expectation: undefined
            },
        ].forEach(({ testCase, input, expectation }) => {
            it(`| ${testCase}`, () => {
                expect(json.getProperty(input)).equal(expectation);
            });
        });
    });

    describe('# inspect correctness for setProperty method', () => {
        const json = new ConfigFile(JSON_CONFIG_PATH);

        [
            {
                testCase: 'set value for property correctly',
                inputPath: ['simpleKey'],
                inputValue: 'dummy'
            },
            {
                testCase: 'set value for property inside an object correctly',
                inputPath: ['objectField', 'internalKey'],
                inputValue: 'dummy'
            },
            {
                testCase: 'set value for property inside an array correctly',
                inputPath: ['arrayField', 0],
                inputValue: 'dummy'
            },
            {
                testCase: 'set value for property in nested level correctly',
                inputPath: ['nested', 'innerArray', 0, 'innerKey'],
                inputValue: 'dummy'
            },
            {
                testCase: 'set value for property not existing',
                inputPath: ['newField'],
                inputValue: 'dummy'
            },
        ].forEach(({ testCase, inputPath, inputValue }) => {
            it(`| ${testCase}`, () => {
                const copy = json.getProperty(inputPath);
                json.setProperty(inputPath, inputValue);
                expect(json.getProperty(inputPath)).equal(inputValue);
                json.setProperty(inputPath, copy);
                expect(json.getProperty(inputPath)).equal(copy);
            });
        });
    });

    describe('# inspect correctness for write method', () => {
        it('| write to JSON file successfully', () => {
            // setup
            const jsonConfig = new ConfigFile(JSON_CONFIG_PATH);
            const propertyPath = ['simpleKey'];
            const copy = jsonConfig.getProperty(propertyPath);
            jsonConfig.setProperty(propertyPath, 'notSimpleValue');
            // call
            jsonConfig.write();
            // verify
            const verifyConfig = new ConfigFile(JSON_CONFIG_PATH);
            expect(verifyConfig.getProperty(propertyPath)).equal('notSimpleValue');
            // clear
            jsonConfig.setProperty(propertyPath, copy);
            jsonConfig.write();
        });

        it('| write to YAML file successfully', () => {
            // setup
            const yamlConfig = new ConfigFile(YAML_CONFIG_PATH);
            const propertyPath = ['simpleKey'];
            const copy = yamlConfig.getProperty(propertyPath);
            yamlConfig.setProperty(propertyPath, 'notSimpleValue');
            // call
            yamlConfig.write();
            // verify
            const verifyConfig = new ConfigFile(YAML_CONFIG_PATH);
            expect(verifyConfig.getProperty(propertyPath)).equal('notSimpleValue');
            // clear
            yamlConfig.setProperty(propertyPath, copy);
            yamlConfig.write();
        });

        it('| expect error thrown when fs writeFileSync fails', () => {
            // setup
            sinon.stub(fs, 'writeFileSync');
            fs.writeFileSync.throws('error');
            try {
                // call
                const json = new ConfigFile(JSON_CONFIG_PATH);
                json.write();
            } catch (err) {
                // verify
                expect(err).match(/error/);
            } finally {
                // clear
                sinon.restore();
            }
        });

        it('| expect error thrown when yaml dump fails', () => {
            // setup
            sinon.stub(yaml, 'dump');
            yaml.dump.throws(new Error('load error'));
            try {
                // call
                const yamlConfig = new ConfigFile(YAML_CONFIG_PATH);
                yamlConfig.write();
            } catch (err) {
                // verify
                expect(err.message).equal('load error');
            } finally {
                // clear
                sinon.restore();
            }
        });
    });
});
