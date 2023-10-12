import api from "./services";

// Login API's
const checkBlockedUser = (payload) =>
  api.get(
    `/login_auth_user_locked?account_name=${payload.account_name}&user=${payload.user}`
  );
const getAuthorisationApi = (payload) =>
  api.get(
    `/login_auth?account_name=${payload.account_name}&user=${payload.user}&password=${payload.password}`
  );
const getAuthorisedUserDetailsApi = (payload) =>
  api.get(
    `/login_auth_user?account_name=${payload.account_name}&user=${payload.user}`
  );
const getAdminPartyAccountApi = (payload) =>
  api.get(
    `/login_get_user?account_name=${payload.account_name}&user=${payload.user}`
  );

// Forgot Password
const getUserData = (payload) =>
  api.get(
    `/get_user_data?account_name=${payload.account_name}&userName=${payload.user_name}`
  );
const getUserNameFromEmail = (payload) =>
  api.get(
    `/get_username_from_email?account_name=${payload.account_name}&email=${payload.email_id}`
  );

const mailtoadmin = (payload) =>
  api.get(
    `/mailtoadmin?mailusedfor=${payload.mailusedfor}&recipient=${payload.recipient}&user_name=${payload.user_name}&password=${payload.password}&email_id=${payload.email_id}&fullName=${payload.fullName}&company=${payload.company}&designation=${payload.designation}&snowflake_account=${payload.snowflake_account}`
  );

// Register
const getAllUsernames = (payload) =>
  api.get(
    `/count_all_users?account_name=${payload.account_name}&user=${payload.user}`
  );
const registerUser = (payload) =>
  api.get(
    `/register_user?account_name=${payload.account_name}&full_name=${payload.full_name}&company=${payload.company}&designation=${payload.designation}&email_id=${payload.email_id}&snowflake_account=${payload.snowflake_account}&userName=${payload.userName}&password=${payload.password}`
  );

// Home Page API's
const getAllUsers = (account_name) =>
  api.get(`/home_page_users?account_name=${account_name}`);
const getLatestPartners = (payload) =>
  api.get(
    `/home_page?account_name=${payload.account_name}&party_account=${payload.party_account}&column_1=${payload.column_1}&column_2=${payload.column_2}`
  );
const getAllProviders = (account_name) =>
  api.get(`/home_page_provider?account_name=${account_name}`);

// Match Rate and Enrichment common API

const getAllProvidersList = (payload) =>
  api.get(
    `/provider_list?account_name=${payload.account_name}&consumer_database_name=${payload.db_name}`
  );
const fetchData = (payload) =>
  api.get(
    `/fetch_requests?account_name=${payload.account_name}&consumer_database_name=${payload.db_name}&template_name=${payload.template_name}`
  );
const getTemplateStatus = (payload) =>
  api.get(
    `/get_template_status_match_rate?account_name=${payload.account_name}&consumer_database_name2=${payload.db_name}&template_name=${payload.template_name}&consumer_name=${payload.consumer_name}`
  );
const downloadFileAPI = (payload) =>
  api.get(
    `/download_request_data?account_name=${payload.account_name}&templateName=${payload.templateName}&run_id=${payload.run_id}&consumer_database_name=${payload.db_name}`
  );
const viewSampleData = (payload) =>
  api.get(
    `/view_sample_data?account_name=${payload.account_name}&templateName=${payload.templateName}&run_id=${payload.run_id}&consumer_database_name=${payload.db_name}`
  );

const callProcedureMatchRate = (payload) =>
  api.get(
    `/call_procedure?account_name=${payload.account_name}&consumer_database_name=${payload.db_name}`
  );

const getRequestDataUsingRunId = (payload) =>
  api.get(
    `/get_request_runId?account_name=${payload.account_name}&newReqId=${payload.newReqId}&consumer_database_name=${payload.db_name}&template_name=${payload.template_name}`
  );

const insertLogTableData = (payload) =>
  api.get(
    `/insert_log_table_data?account_name=${payload.account_name}&RUN_ID=${payload.RUN_ID}&TEMPLATE_NAME=${payload.TEMPLATE_NAME}&CONSUMER_RECORD_COUNT=${payload.CONSUMER_RECORD_COUNT}&PROVIDER_NAME=${payload.PROVIDER_NAME}&CONSUMER_NAME=${payload.CONSUMER_NAME}&REQUEST_TS=${payload.REQUEST_TS}&STATUS=${payload.STATUS}`
  );

const getProviderAccount = (payload) =>
  api.get(
    `/get_provider_account?account_name=${payload.account_name}&consumer_database_name=${payload.db_name}&provider_name=${payload.provider_name}`
  );

// MAtch Rate API

const attachment = (payload) =>
  api.get(
    `/attachment?account_name=${payload.account_name}&filename=${payload.filename}&identifyer=${payload.identifyer}&db_name=${payload.db_name}`
  );

const insertMatchRateRequest = (payload) =>
  api.get(
    `/insert_request_data_match_rate?account_name=${payload.account_name}&template_name=${payload.template_name}&provider_name=${payload.provider_name}&columns=${payload.columns}&consumer_name=${payload.consumer_name}&run_id=${payload.run_id}&file_name=${payload.file_name}&attribute_name=${payload.attribute_name}&attribute_value=${payload.attribute_value}&consumer_database_name=${payload.consumer_database_name}`
  );

const insertRunId = (payload) =>
  api.get(
    `/insert_RUNID?account_name=${payload.account_name}&run_id=${payload.run_id}&provider_database_name=${payload.db_name}`
  );

const viewRequestDataMatchRate = (payload) =>
  api.get(
    `/view_request_data?account_name=${payload.account_name}&templateName=${payload.templateName}&run_id=${payload.run_id}&consumer_database_name=${payload.consumer_database_name}`
  );

// Enrichment Page API's

const getAllowedColumns = (payload) =>
  api.get(
    `/Enrichment_allowed_columns?account_name=${payload.account_name}&databaseName=${payload.databaseName}&Query_Name=${payload.Query_Name}`
  );
const getDatabaseName = (payload) =>
  api.get(
    `/get_database_name?account_name=${payload.account_name}&selectedProvider=${payload.selectedProvider}&consumer_database_name=${payload.consumer_database_name}`
  );
const getTemplateNames = (payload) =>
  api.get(
    `/get_template_name?account_name=${payload.account_name}&databaseName=${payload.databaseName}`
  );

const insertEnrichmentRequest = (payload) =>
  api.get(
    `/insert_request_data_enrichment?account_name=${payload.account_name}&template_name=${payload.template_name}&provider_name=${payload.provider_name}&columns=${payload.columns}&consumer_name=${payload.consumer_name}&run_id=${payload.run_id}&attribute_value=${payload.attribute_value}&consumer_database_name=${payload.consumer_database_name}`
  );

// Status page API's

const getAllRequestData = (payload) =>
  api.get(
    `/get_all_requests?account_name=${payload.account_name}&consumer_database_name=${payload.db_name}`
  );

const filterStatusTable = (payload) =>
  api.get(
    `/filter_table?account_name=${payload.account_name}&providerNames=${payload.providerNames}&templateNames=${payload.templateNames}&statuses=${payload.statuses}&date=${payload.date}`
  );

// Search Page API's

const getIntegratedProviders = (payload) =>
  api.get(
    `/Search_provider?account_name=${payload.account_name}&CONSUMER_NAME=${payload.CONSUMER_NAME}`
  );
const getAllCatalog = (payload) =>
  api.get(`/Search_all_catalog?account_name=${payload.account_name}`);

const getConsumerSourceTable = (payload) =>
  api.get(
    `/get_consumer_table?account_name=${payload.account_name}&consumer_database_name=${payload.db_name}`
  );

const getProviderNameSearch = (payload) =>
  api.get(`/get_provider_name?account_name=${payload.account_name}`);

const getCategoriesList = (payload) =>
  api.get(`/get_category_list?account_name=${payload.account_name}`);

const getSubCategoriesSearch = (payload) =>
  api.get(
    `/get_categories?account_name=${payload.account_name}&Category=${payload.categories}`
  );
const filterSearchTable = (payload) =>
  api.get(
    `/filter_search_table?account_name=${payload.account_name}&categories=${payload.categories}&subCategories=${payload.subCategories}&providers=${payload.providers}`
  );

const viewProvidersCatalogue = (payload) =>
  api.get(
    `/view_provider_catalog?account_name=${payload.account_name}&provider_name=${payload.provider_name}&entity_name=${payload.entity_name}`
  );

const getPartyAccount = (payload) =>
  api.get(
    `/get_party_account?account_name=${payload.account_name}&provider_name=${payload.provider_name}`
  );

const insertIntegrateConsumer = (payload) =>
  api.get(
    `/integrate_consumer?account_name=${payload.account_name}&CONSUMER_ACCOUNT=${payload.CONSUMER_ACCOUNT}&PROVIDER_ACCOUNT=${payload.PROVIDER_ACCOUNT}&provider_name=${payload.provider_name}&CONSUMER_NAME=${payload.CONSUMER_NAME}`
  );

const integrateConsumer = (payload) =>
  api.get(
    `/consumerintegrate?CONSUMER_ACCOUNT=${payload.CONSUMER_ACCOUNT}&PROVIDER_ACCOUNT=${payload.PROVIDER_ACCOUNT}&provider_name=${payload.provider_name}&CONSUMER_NAME=${payload.CONSUMER_NAME}`
  );

// Upload new Cataloge
const getSubCategories = (payload) =>
  api.get(`/get_sub_category?account_name=${payload.account_name}`);
const insertUpdateCatalogue = (payload) =>
  api.get(
    `/insert_update_catalog?account_name=${payload.account_name}&result=${payload.result}`
  );
const procedureInsertCatalogue = (payload) =>
  api.get(`/procedure_insertcatalog?account_name=${payload.account_name}`);

// Update existing cataloge upload
const getAllEntities = (payload) =>
  api.get(
    `/get_entities?account_name=${payload.account_name}&user=${payload.user}`
  );
const deleteEntity = (payload) =>
  api.get(
    `/delete_entity?account_name=${payload.account_name}&entity_name=${payload.entity_name}`
  );
const getEntityRecord = (payload) =>
  api.get(
    `/get_records_entities?account_name=${payload.account_name}&provider_name=${payload.provider_name}&entity_name=${payload.entity_name}`
  );
const deleteAttribute = (payload) =>
  api.get(
    `/delete_attribute?account_name=${payload.account_name}&provider_name=${payload.provider_name}&entity_name=${payload.entity_name}&ATTRIBUTE_NAME=${payload.attribute_name}`
  );
const procedureAddAttribute = (payload) =>
  api.get(`/procedure_add_attribute?account_name=${payload.account_name}`);
const procedureUpdateAttribute = (payload) =>
  api.get(`/procedure_update_attribute?account_name=${payload.account_name}`);

// Admin Console API's
const fetchUserProfileIntegration = (payload) =>
  api.get(`/fetch_user_profile?account_name=${payload.account_name}`);
const fetchUserProfile = (payload) =>
  api.get(
    `/fetch_profile?account_name=${payload.account_name}&UserRole=${payload.UserRole}&partyAccount=${payload.partyAccount}`
  );
const updateUserProfile = (payload) =>
  api.get(
    `/update_user_profile?account_name=${payload.account_name}&role=${payload.role}&status=${payload.status}&userName=${payload.user_name}`
  );
const getConsumerName = (payload) =>
  api.get(
    `/get_consumer?account_name=${payload.account_name}&provider_database_name=${payload.provider_database_name}`
  );
const getTemplates = (payload) =>
  api.get(
    `/get_templates?account_name=${payload.account_name}&user=${payload.user}&provider_database_name=${payload.provider_database_name}`
  );
const getAllowedColumnsConsole = (payload) =>
  api.get(
    `/get_allowed_columns?account_name=${payload.account_name}&user=${payload.user}&template_name=${payload.template_name}&provider_database_name=${payload.provider_database_name}`
  );
const getAllColumnsConsole = (payload) =>
  api.get(
    `/get_all_columns?account_name=${payload.account_name}&user=${payload.user}&template_name=${payload.template_name}&provider_database_name=${payload.provider_database_name}`
  );
const fetchAllowedColumnStatus = (payload) =>
  api.get(
    `/fetch_allowed_column_status?account_name=${payload.account_name}&user=${payload.user}&template_name=${payload.template_name}&column_name=${payload.column_name}&provider_database_name=${payload.provider_database_name}`
  );
const updateAllowedColumns = (payload) =>
  api.get(
    `/insert_allowed_column_data?account_name=${payload.account_name}&provider_database_name=${payload.db_name}&result=${payload.result}`
  );
const procedureUpdateAllowedColumns = (payload) =>
  api.get(
    `/procedure_templates?account_name=${payload.account_name}&provider_database_name=${payload.provider_database_name}`
  );

// Itemised Bills
const getConsumerAdmin = (payload) =>
  api.get(`/get_consumer_admin?account_name=${payload.account_name}`);
const fetchTemplateStatus = (payload) =>
  api.get(
    `/get_template_status?account_name=${payload.account_name}&user=${payload.user}&template_name=${payload.template_name}&provider_database_name=${payload.provider_database_name}`
  );
const updateTemplates = (payload) =>
  api.get(
    `/update_template?account_name=${payload.account_name}&user=${payload.user}&template_name=${payload.template_name}&template_status=${payload.status}&provider_database_name=${payload.provider_database_name}`
  );

// Logs
const getLogsData = (payload) =>
  api.get(`/get_logs?account_name=${payload.account_name}`);
const filterLogTable = (payload) =>
  api.get(
    `/filter_logs?account_name=${payload.account_name}&consumerNames=${payload.consumerNames}&providerNames=${payload.providerNames}&templateNames=${payload.templateNames}&statuses=${payload.statuses}&date=${payload.date}`
  );

const API = {
  checkBlockedUser,
  getAuthorisationApi,
  getAuthorisedUserDetailsApi,
  getAdminPartyAccountApi,

  getAllUsernames,
  registerUser,

  getAllUsers,
  getLatestPartners,
  getAllProviders,

  getUserData,
  getUserNameFromEmail,
  mailtoadmin,

  //common
  getAllProvidersList,
  fetchData,
  viewSampleData,
  downloadFileAPI,

  //Match Rate
  getTemplateStatus,
  callProcedureMatchRate,
  getRequestDataUsingRunId,
  insertLogTableData,
  attachment,
  getProviderAccount,
  insertMatchRateRequest,
  insertRunId,
  viewRequestDataMatchRate,

  // Enrichment
  getAllowedColumns,
  getDatabaseName,
  getTemplateNames,
  insertEnrichmentRequest,

  // Status
  getAllRequestData,
  filterStatusTable,

  // Search Catalog
  getIntegratedProviders,
  getAllCatalog,
  getConsumerSourceTable,
  getProviderNameSearch,
  getCategoriesList,
  getSubCategoriesSearch,
  filterSearchTable,
  viewProvidersCatalogue,
  getPartyAccount,
  insertIntegrateConsumer,
  integrateConsumer,

  // New cataloge upload
  getSubCategories,
  insertUpdateCatalogue,
  procedureInsertCatalogue,

  // Update existing cataloge upload
  getAllEntities,
  deleteEntity,
  getEntityRecord,
  deleteAttribute,
  procedureAddAttribute,
  procedureUpdateAttribute,

  // Admin Console
  fetchUserProfileIntegration,
  fetchUserProfile,
  updateUserProfile,
  getConsumerName,
  getTemplates,
  getAllowedColumnsConsole,
  getAllColumnsConsole,
  fetchAllowedColumnStatus,
  updateAllowedColumns,
  procedureUpdateAllowedColumns,
  getConsumerAdmin,
  fetchTemplateStatus,
  updateTemplates,
  getLogsData,
  filterLogTable,
};

export default API;
