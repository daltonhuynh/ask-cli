require('module-alias/register');

/**
 * This list manages all the files we want to cover during the refactor.
 * Please also include the test-ready module in package.json's "nyc.include" list.
 * Make sure test coverage meets the bar.
 */
[
    // UNIT TEST
    // commands
    '@test/unit/commands/option-validator-test',
    '@test/unit/commands/abstract-command-test',
    '@test/unit/commands/api/publishing/withdraw/helper-test.js',
    '@test/unit/commands/api/validation/validate-skill/helper-test.js',
    // command - init
    '@test/unit/commands/init/ask-setup-helper-test',
    '@test/unit/commands/init/aws-setup-wizard-test',
    '@test/unit/commands/init/aws-setup-helper-test',
    '@test/unit/commands/init/handler-test',
    '@test/unit/commands/init/ui-test',
    '@test/unit/commands/init/questions-test',
    // command - new
    '@test/unit/commands/v2new/index-test',
    '@test/unit/commands/v2new/ui-test',
    '@test/unit/commands/v2new/helper-test',
    // command - deploy
    '@test/unit/commands/deploy/index-test',
    '@test/unit/commands/deploy/helper-test',
    // clients
    '@test/unit/clients/http-client-test',
    '@test/unit/clients/smapi-client-test',
    '@test/unit/clients/git-client-test',
    '@test/unit/clients/aws-client/s3-client-test',
    '@test/unit/clients/aws-client/cloudformation-client-test',
    '@test/unit/clients/aws-client/aws-util-test',
    // model
    '@test/unit/model/abstract-config-file-test',
    '@test/unit/model/app-config-test',
    '@test/unit/model/manifest-test',
    '@test/unit/model/resources-config-test',
    '@test/unit/model/yaml-parser-test',
    '@test/unit/model/regional-stack-file-test',
    // controller
    '@test/unit/controller/skill-metadata-controller-test',
    '@test/unit/controller/skill-code-controller-test',
    '@test/unit/controller/code-builder-test',
    '@test/unit/controller/skill-infrastructure-controller-test',
    '@test/unit/controller/deploy-delegate-test',
    // view
    '@test/unit/view/messenger-test',
    '@test/unit/view/json-view-test',
    '@test/unit/view/spinner-view-test',
    '@test/unit/view/multi-tasks-view-test',
    // utils
    '@test/unit/utils/url-utils-test',
    '@test/unit/utils/string-utils-test',
    '@test/unit/utils/zip-utils-test',
    '@test/unit/utils/hash-utils-test',
    '@test/unit/utils/retry-utility-test',


    // FUNCTION TEST
    // skill
    '@test/functional/commands/api/skill/create-skill-test',
    '@test/functional/commands/api/skill/delete-skill-test',
    '@test/functional/commands/api/skill/get-skill-status-test',
    '@test/functional/commands/api/skill/list-skills-test',
    '@test/functional/commands/api/credentials/get-skill-credentials-test',
    // manifest
    '@test/functional/commands/api/manifest/get-manifest-test',
    '@test/functional/commands/api/manifest/update-manifest-test',
    // interaction model
    '@test/functional/commands/api/interaction-model/get-interaction-model-test',
    '@test/functional/commands/api/interaction-model/set-interaction-model-test',
    '@test/functional/commands/api/interaction-model/head-interaction-model-test',
    '@test/functional/commands/api/interaction-model/list-interaction-model-versions-test',
    // account linking
    '@test/functional/commands/api/account-linking/delete-account-linking-test',
    '@test/functional/commands/api/account-linking/get-account-linking-test',
    // skill publishing
    '@test/functional/commands/api/enablement/enable-skill-test',
    '@test/functional/commands/api/enablement/disable-skill-test',
    '@test/functional/commands/api/enablement/get-skill-enablement-test',
    '@test/functional/commands/api/publishing/submit-test',
    '@test/functional/commands/api/publishing/withdraw-test',
    '@test/functional/commands/api/publishing/get-certification-test',
    '@test/functional/commands/api/publishing/list-certifications-test',
    // vendor
    '@test/functional/commands/api/vendor/list-vendors-test',
    // test
    '@test/functional/commands/api/test/invoke-skill-test',
    '@test/functional/commands/api/test/get-simulation-test',
    '@test/functional/commands/api/test/simulate-skill-test',
    '@test/functional/commands/api/evaluations/nlu-profile-test',
    // validation
    '@test/functional/commands/api/validation/get-validation-test',
    '@test/functional/commands/api/validation/validate-skill-test',
    // evaluation
    '@test/functional/commands/api/evaluations/nlu-profile-test',
    // alexa hosted skill
    '@test/functional/commands/api/alexa-hosted/get-git-credentials-test',
    '@test/functional/commands/api/alexa-hosted/get-alexa-hosted-skill-metadata-test',
    '@test/functional/commands/api/alexa-hosted/get-hosted-skill-permission-test',
    // beta test
    '@test/functional/commands/api/beta-test/create-beta-test-test',
    '@test/functional/commands/api/beta-test/update-beta-test-test',
    '@test/functional/commands/api/beta-test/get-beta-test-test',
    '@test/functional/commands/api/beta-test/start-beta-test-test',
    '@test/functional/commands/api/beta-test/end-beta-test-test',
    '@test/functional/commands/api/beta-test/list-beta-testers-test',
    '@test/functional/commands/api/beta-test/add-beta-testers-test',
    '@test/functional/commands/api/beta-test/remove-beta-testers-test',
    '@test/functional/commands/api/beta-test/request-feedback-from-beta-testers-test',
    '@test/functional/commands/api/beta-test/send-reminder-to-beta-testers-test',
    // in-skill products
    '@test/functional/commands/api/isp/create-isp-test',
    '@test/functional/commands/api/isp/update-isp-test',
    '@test/functional/commands/api/isp/associate-isp-test',
    '@test/functional/commands/api/isp/disassociate-isp-test',
    '@test/functional/commands/api/isp/delete-isp-test',
    '@test/functional/commands/api/isp/get-isp-test',
    '@test/functional/commands/api/isp/list-isp-for-skill-test',
    '@test/functional/commands/api/isp/list-skills-for-isp-test',
    '@test/functional/commands/api/isp/reset-isp-entitlement-test',
    '@test/functional/commands/api/isp/list-isp-for-vendor-test',
    // private skill
    '@test/functional/commands/api/private/add-private-distribution-account-test.js',
    '@test/functional/commands/api/private/delete-private-distribution-account-test.js',
    '@test/functional/commands/api/private/list-private-distribution-accounts-test.js',
    // catalog
    '@test/functional/commands/api/catalog/associate-catalog-with-skill',
    '@test/functional/commands/api/catalog/create-catalog',
    '@test/functional/commands/api/catalog/get-catalog',
    '@test/functional/commands/api/catalog/get-catalog-upload',
    '@test/functional/commands/api/catalog/list-catalog-uploads',
    '@test/functional/commands/api/catalog/list-catalogs',
    '@test/functional/commands/api/history/intent-requests-history-test',
].forEach((testFile) => {
    // eslint-disable-next-line global-require
    require(testFile);
});
