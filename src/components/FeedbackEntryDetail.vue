<template>
  <div @click="onClick">
    <div v-if="widget.type == 'feedback'" class="alert alert-warning">
      Category: {{rowData.category}}
      <br>Rating:
      <span v-if="rowData.rating && !rowData.rating.includes('base64')" v-html="rowData.rating"></span>
      <img width="25px" height="25px" v-else :src="rowData.rating">
      <hr>
      Message: {{rowData.description}}
    </div>
    <div v-else-if="rowData.answers && rowData.answers.length">
      <div :key="index" class="alert alert-info" v-for="(answer, index) in rowData.answers">
        <span class="text-medium" style="font-size:12px; color:black;opacity:.7">Question</span>
        <h6>{{answer.question && answer.question.content}}</h6>
        <ul class="fponse" v-if="answer.question && answer.question.options">
          <span class="text-medium" style="font-size:12px; color:black;opacity:.7">Answers</span>
          <li
            :key="i"
            v-for="(option,i) in answer.question.options"
            :class="answer.question_option_id == option.id ? 'selected' : ''"
            v-html="answer.question_option_id == option.id ? `<i class='zmdi zmdi-check-square pr-3'></i><span class='text-medium'>${option.content}</span>` : `<i class='zmdi zmdi-check-square pr-3' style='color:#E4E4E4'></i><span style='color:black;opacity:.5'>${option.content}</span>`"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeedbackEntryDetail",
  props: {
    rowData: {
      required: true
    },
    rowIndex: {},
    options: {}
  },
  methods: {
    onClick(event) {
      console.log("my-detail-row: on-click", event.target);
    }
  },
  computed: {
    widget() {
      return this.$store.getters["feedbacks/feedback"];
    }
  }
};
</script>

<style lang="scss" scoped>
.fponse {
  list-style-type: none;
  padding: 0px;
  :not(.selected) {
    span {
      color: #f7f7f7;
    }
  }
}
.vuetable-detail-row {
  .alert {
    background: transparent;
    border: none;
    border-left: 2px solid purple;
    border-radius: inherit;
  }
}
</style>
