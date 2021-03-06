<template>
  <div>
    <vuetable
      ref="entriestable"
      :api-url="api"
      class="table-bordered"
      :first-page="0"
      :http-options="{ headers:{ 'Authorization' : 'Bearer ' + $auth.token() } }"
      :fields="columns"
      :append-params="moreParams"
      data-path="data"
      pagination-path
      :detail-row-component="feedbackEntryDetail"
      @vuetable:cell-clicked="onCellClicked"
      track-by="id"
      @vuetable:pagination-data="onPaginationData"
    >
      <template slot="id" slot-scope="props">{{props.rowIndex+1}}</template>
    </vuetable>
    <vuetable-pagination
      v-show="paginationData.total"
      :css="table_css.pagination"
      ref="pagination"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
  </div>
</template>
