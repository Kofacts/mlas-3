<template>
  <section>
    <Header>
      <h1 slot="title">{{ body.id ? `Update your ${body.name}` : 'Create your First'}} Widget</h1>
      <h6
        slot="description"
        class="text-opacity"
      >{{body.description || 'Select what action widget you want from the below'}}</h6>
    </Header>

    <div class="container no-padd-mobile">
      <Card :stage="3">
        <div slot="card-content__fields">
          <!-- <div class="card-content__stage"></div> -->
          <div
            :key="index"
            class="alert alert-danger alert-dismissible"
            v-for="(error,index) in errors"
          >{{error.msg}}</div>
          <form>
            <div class="row card-content__fields-form">
              <div class="col-sm-6 mt-5 control">
                <input
                  id="name"
                  name="name"
                  v-model="body.name"
                  v-validate="'required'"
                  type="text"
                  placeholder="Enter Widget name"
                >
                <label for="name" class="pl-1 pr-3 pt-2">
                  <h6 class="text-small">What should we call this Widget</h6>
                </label>
                <small
                  class="form-text text-danger"
                  v-show="errors.has('name')"
                >{{errors.first('name')}}</small>
              </div>

              <div class="col-sm-6 mt-5 control">
                <input
                  id="description"
                  name="description"
                  v-model="body.description"
                  type="text"
                  placeholder="Enter Widget description"
                >
                <label for="description" class="pl-1 pr-3 pt-2">
                  <h6 class="text-small">What is the widget about</h6>
                </label>
                <small
                  class="form-text text-danger"
                  v-show="errors.has('description')"
                >{{errors.first('description')}}</small>
              </div>

              <div class="col-sm-12 col-lg-10 mt-5">
                <h6 class="text-medium">What type of feedback widget are you looking to create?</h6>
                <small
                  class="form-text text-danger"
                  v-show="errors.has('type')"
                >{{errors.first('type')}}</small>

                <div class="checkbox-s mt-5">
                  <div class="row">
                    <div class="col-sm-12 col-lg-3">
                      <div
                        v-bind:style="{'pointer-events': $auth.user().plan_id < 4 ? 'none' : '' }"
                        class="checkbox"
                        @click="setOption('survey')"
                      >
                        <div
                          class="checkbox-option text-center pb-5"
                          :id="body.type == 'survey' ? 'active' : ''"
                        >
                          <div class="selected text-right">
                            <button class="mr-3"></button>
                          </div>
                          <div class="checkbox-option__icon mt-3">
                            <i class="zmdi zmdi-copy"></i>
                          </div>
                        </div>
                        <h6 class="text-medium text-center pt-3">Survey</h6>
                      </div>
                    </div>
                    <div class="col-sm-12 col-lg-3">
                      <div class="checkbox" @click="setOption('feedback')">
                        <div
                          class="checkbox-option text-center pb-5"
                          :id="body.type == 'feedback' ? 'active' : ''"
                        >
                          <div class="selected text-right">
                            <button class="mr-3"></button>
                          </div>
                          <div class="checkbox-option__icon mt-3">
                            <i class="zmdi zmdi-comments"></i>
                          </div>
                        </div>
                        <h6 class="text-medium text-center pt-3">Feedback</h6>
                      </div>
                    </div>
                    <div class="col-sm-12 col-lg-3">
                      <div
                        v-bind:style="{'pointer-events': $auth.user().plan_id < 2 ? 'none' : '' }"
                        class="checkbox"
                        @click="setOption('poll')"
                      >
                        <div
                          class="checkbox-option text-center pb-5"
                          :id="body.type == 'poll' ? 'active' : ''"
                        >
                          <div class="selected text-right">
                            <button class="mr-3"></button>
                          </div>
                          <div class="checkbox-option__icon mt-3">
                            <i class="zmdi zmdi-blur"></i>
                          </div>
                        </div>
                        <h6 class="text-medium text-center pt-3">Poll</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-5 content-wrapper">
              <div class="col-sm-12 col-lg-12 mt-5" v-if="body.type == 'survey'">
                <div class="content-wrapper__empty text-center pt-5 pb-5">
                  <h6>Add Questions to your {{body.type}}</h6>
                  <button
                    type="button"
                    class="button pt-1"
                    @click="addQuestion(randomString(5, true))"
                  >
                    <h6 class="text-small">Create Question +</h6>
                  </button>
                  <small
                    class="form-text text-danger"
                    v-show="errors.has('quiz')"
                  >{{errors.first('quiz')}}</small>
                </div>
                <div>
                  <div class="content-wrapper__box mt-5">
                    <small
                      class="form-text text-danger"
                      v-show="errors.has('quiz_question')"
                    >{{errors.first('quiz_question')}}</small>
                    <small
                      class="form-text text-danger"
                      v-show="errors.has('quiz_answer')"
                    >{{errors.first('quiz_answer')}}</small>
                    <ul class="questions pr-4">
                      <li
                        v-for="(question,index) in body.questions"
                        :key="question.id"
                        class="question mt-2"
                      >
                        <div class="question__field">
                          <button
                            type="button"
                            @click="removeQuestion(question._id)"
                            class="question__field-delete"
                          >
                            <i class="zmdi zmdi-close"></i>
                          </button>
                          <div class="pl-4 question__field-area">
                            <input
                              v-model="body.questions[index].content"
                              type="text"
                              placeholder="Enter Question here"
                            >
                          </div>
                        </div>
                        <!--                        <div class="question__field">-->
                        <!--                          <div class="form-group">-->
                        <!--                            <label for="question_type" style="padding-left: 10px">Select Question Type</label>-->
                        <!--                            <select id="question_type" class="form-control" v-model="body.questions[index].type"-->
                        <!--                                    type="text">-->
                        <!--                              <option :value="type.id" v-for="(type, index) in questionTypes" :key="index">-->
                        <!--                                {{type.name}}-->
                        <!--                              </option>-->
                        <!--                            </select>-->
                        <!--                          </div>-->
                        <!--                        </div>-->
                        <div class="question__answers pt-3 ml-5">
                          <button
                            @click="addAnswerToQuestion(index)"
                            type="button"
                            class="button button-outline"
                          >
                            <h6 class="text-small text-medium">Add Options to Question</h6>
                          </button>
                          <div
                            v-for="(answer,j) in question.answers"
                            :key="answer._id"
                            class="row question__answers-field mt-3"
                          >
                            <button
                              type="button"
                              @click="removeAnswerToQuestion(answer._id, index)"
                              class="question__field-delete rounded-circle"
                            >
                              <i class="zmdi zmdi-close"></i>
                            </button>
                            <div class="col-sm-12 col-lg-4 control">
                              <input
                                :id="'answer'+index+j"
                                v-model="body.questions[index].answers[j].content"
                                type="text"
                                placeholder="Enter Option"
                              >
                              <label :for="'answer'+index+j" class="pl-1 pr-3 pt-2">
                                <h6 class="text-small">Option</h6>
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-lg-12 mt-5" v-if="body.type == 'poll'">
                <div class="content-wrapper__empty text-center pt-5 pb-5">
                  <h6>Set Poll Question</h6>
                  <small
                    class="form-text text-danger"
                    v-show="errors.has('poll')"
                  >{{errors.first('poll')}}</small>
                </div>
                <div>
                  <div class="content-wrapper__box mt-5">
                    <ul class="questions pr-4">
                      <li class="question mt-2">
                        <div class="question__field">
                          <span class="question__field-delete">
                            <i class="zmdi zmdi-close"></i>
                          </span>
                          <div class="pl-4 question__field-area">
                            <input
                              v-validate="'required'"
                              v-model="body.question.content"
                              type="text"
                              name="poll_question"
                              placeholder="Enter Question here"
                            >
                            <small
                              class="form-text text-danger"
                              v-show="errors.has('poll_question')"
                            >{{errors.first('poll_question')}}</small>
                          </div>
                        </div>
                        <div class="question__answers pt-3 ml-5">
                          <button
                            @click="addAnswerToQuestion(null, true)"
                            type="button"
                            class="button button-outline"
                          >
                            <h6 class="text-small text-medium">Add Options to Poll</h6>
                          </button>
                          <small
                            class="form-text text-danger"
                            v-show="errors.has('poll_answer')"
                          >{{errors.first('poll_answer')}}</small>
                          <div
                            v-for="(answer,k) in body.question.answers"
                            :key="k"
                            class="row question__answers-field mt-3"
                          >
                            <button
                              @click="removeAnswerToQuestion(answer._id, null, true)"
                              class="question__field-delete"
                            >
                              <i class="zmdi zmdi-close"></i>
                            </button>
                            <div class="col-sm-12 col-lg-4 control">
                              <input
                                :id="'answer'+k"
                                v-model="body.question.answers[k].content"
                                type="text"
                                placeholder="Enter Answer"
                              >
                              <label :for="'answer'+k" class="pl-1 pr-3 pt-2">
                                <h6 class="text-small">Answer</h6>
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div class="card-content__fields-form__footer mt-5">
                <button
                  type="button"
                  :disabled="loading"
                  @click="proceed"
                  class="button button-primary float-right pl-4 pr-4"
                >
                  <span v-if="!loading">Save & Continue</span>
                  <span v-if="!loading" class="pl-2">
                    <i class="zmdi zmdi-long-arrow-right"></i>
                  </span>
                  <span v-if="loading">
                    <svg
                      fill="#FFFFFF"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      style="enable-background:new 0 0 50 50;"
                      xml:space="preserve"
                    >
                      <rect x="0" y="0" width="4" height="7" fill="#FFF">
                        <animateTransform
                          attributeType="xml"
                          attributeName="transform"
                          type="scale"
                          values="1,1; 1,3; 1,1"
                          begin="0s"
                          dur="0.6s"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </rect>

                      <rect x="10" y="0" width="4" height="7" fill="#FFF">
                        <animateTransform
                          attributeType="xml"
                          attributeName="transform"
                          type="scale"
                          values="1,1; 1,3; 1,1"
                          begin="0.2s"
                          dur="0.6s"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </rect>
                      <rect x="20" y="0" width="4" height="7" fill="#FFF">
                        <animateTransform
                          attributeType="xml"
                          attributeName="transform"
                          type="scale"
                          values="1,1; 1,3; 1,1"
                          begin="0.4s"
                          dur="0.6s"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </rect>
                    </svg>
                  </span>
                </button>
                <button type="button" class="button button-outline float-right pl-4 pr-4 mr-2">
                  <!-- <span class="pr-2">
                    <i class="zmdi zmdi-long-arrow-left"></i>
                  </span>-->
                  <span @click="$router.go(-1)">Go back</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.question__field-delete {
  width: 20px;
  position: absolute;
  transform: translate(-30px, 10px);
  height: 20px;
  border-radius: 20px;
  background: #e4e4e4;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0px;
}
.questions {
  list-style-type: none;
  .question {
    .question__field {
      position: relative;
      height: 70px;
      border: 3px solid #f5f5f5;
      background: white;
      //   padding-left: 20px;

      .question__field-delete {
        width: 20px;
        position: absolute;
        transform: translate(-30px, 10px);
        height: 20px;
        border-radius: 20px;
        background: #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 0px;
        &:hover {
          background: #f7f7f7;
        }
      }
      .question__field-area {
        height: 64px;
        width: 100%;

        input {
          height: inherit;
          width: inherit;
          border: 0px;
          outline: none;
        }
      }

      &::before {
        content: "";
        height: 64px;
        width: 7px;
        background: #1fa883;
        position: absolute;
        box-sizing: border-box;
      }
    }
  }
}
.check {
  border: 3px solid #f5f5f5;
  border-radius: 6px;

  .check__label {
    position: absolute;
    transform: translateY(-15px);
    h6 {
      font-family: "graphikMedium" !important;
      opacity: 0.7;
    }
  }
  .check__options {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

<script>
  import Header from "@/components/Layouts/Header";
  import Card from "@/components/Cards";
  import swal from "sweetalert";
  import {handleApiError, randomString} from "@/helpers/general";

  export default {
  title: "New Widget - Onboarding",
  name: "Customise",
  components: { Header, Card },
  data() {
    return {
      loading: false,
      body: {
        type: "feedback",
        name: "",
        description: "",
        questions: [],
        question: { content: "", answers: [] }
      },
      types: [
        { id: 1, name: "survey" },
        { id: 2, name: "feedback" },
        { id: 3, name: "poll" }
      ],
      questionTypes: [
        { id: "radio", name: "Single Answers" },
        { id: "checkbox", name: "Multiple Answers" },
        { id: "text", name: "Free Text" }
      ]
    };
  },
  methods: {
    randomString,
    handleApiError,
    setOption(type) {
      this.body.type = type;
    },
    addQuestion(id) {
      this.body.questions.push({
        _id: id,
        content: "",
        type: null,
        answers: []
      });
    },
    removeQuestion(index) {
      this.body.questions = this.body.questions.filter(s => s._id != index);
    },
    addAnswerToQuestion(index, poll = false) {
      let data = { _id: randomString(7, true), content: "" };
      poll
        ? this.body.question.answers.push(data)
        : this.body.questions[index].answers.push(data);
    },
    removeAnswerToQuestion(index, qindex = null, poll = false) {
      poll
        ? (this.body.question.answers = this.body.question.answers.filter(
            s => s._id != index
          ))
        : (this.body.questions[qindex].answers = this.body.questions[
            qindex
          ].answers.filter(s => s._id != index));
    },
    proceed() {
      this.errors.clear();
      this.$validator.validateAll().then(valid => {
        let errors = 0;
        if (!this.body.type) {
          this.errors.add({
            field: "type",
            msg: "Widget Type must be selected"
          });

          errors++;
        }

        if (
          this.body.type &&
          this.body.type == "survey" &&
          this.body.questions &&
          this.body.questions.length < 1
        ) {
          this.errors.add({
            field: "quiz",
            msg: "Survey widget must contain at least 1 question with options"
          });
          errors++;
        }
        if (
          this.body.type &&
          this.body.type == "survey" &&
          this.body.questions &&
          this.body.questions.filter(s => !s.content).length
        ) {
          this.errors.add({
            field: "quiz_question",
            msg: "Survey widget question must have a question"
          });
          errors++;
        }
        if (
          this.body.type &&
          this.body.type == "survey" &&
          this.body.questions &&
          this.body.questions.filter(
            s => s.type != "text" && s.answers.length < 2
          ).length
        ) {
          this.errors.add({
            field: "quiz_answer",
            msg:
              "Survey widget question must contain at least 2 option if not freeText question"
          });
          errors++;
        }
        if (
          this.body.type &&
          this.body.type == "poll" &&
          this.body.questions &&
          !this.body.question.content
        ) {
          this.errors.add({
            field: "poll",
            msg: "Poll widget question cannot be empty"
          });
          errors++;
        }
        if (
          this.body.type &&
          this.body.type == "poll" &&
          this.body.question &&
          (!this.body.question.answers || this.body.question.answers.length < 2)
        ) {
          this.errors.add({
            field: "poll_question",
            msg: "Poll widget question must contain at least 2 option"
          });
          errors++;
        }
        if (
          this.body.type &&
          this.body.type == "poll" &&
          this.body.question &&
          this.body.question.answers &&
          this.body.question.answers.filter(s => !s.content).length
        ) {
          this.errors.add({
            field: "poll_question",
            msg: "Poll widget question must contain at least 2 option"
          });
          errors++;
        }

        if (valid && errors === 0) {
          this.submit();
        }
      });
    },
    submit() {
      this.loading = true;
      let payload = {};
      Object.assign(payload, this.body);
      this.$store
        .dispatch("feedbacks/createUpdate", payload)
        .then(data => {
          // this.resetForm();
          let innerHtml = `<span>Widget ${
            data.id ? "Updated" : "Created"
          } Successfully with ID #${data.id}`;
          let html = document.createElement("div");
          html.innerHTML = innerHtml;
          swal({
            title: "Proceed to customization?",
            content: html,
            buttons: ["Nah", "Sure, go ahead"],
            icon: "warning"
          }).then(confirm => {
            if (confirm) {
              this.$router.push({ name: "Customise", params: { id: data.id } });
            }
          });
        })
        .catch(err => {
          let vm = this;
          handleApiError(vm, err, "Action failed. Please try again.");
        })
        .finally(() => (this.loading = false));
    },
    resetForm() {
      this.errors.clear();
      this.body = {
        type: null,
        content: "",
        description: "",
        questions: [],
        question: { content: "", type: null, answers: [] }
      };
    }
  },
  created() {
    if (this.$route.params.id) {
      this.body.id == this.$route.params.id ||
        this.$store
          .dispatch("feedbacks/fetchSingle", this.$route.params.id)
          .then(data => {
            Object.assign(this.body, data);
            this.body.quiz_id = data.quiz ? data.quiz.id : null;

            if (
              this.body.type == "survey" &&
              this.body.quiz &&
              this.body.quiz.questions
            ) {
              this.body.questions = this.body.quiz.questions.map(d => {
                return {
                  id: d.id,
                  _id: d.id,
                  content: d.content,
                  type: d.question_type,
                  answers: d.options.map(o => {
                    return { id: o.id, _id: o.id, content: o.content };
                  })
                };
              });
            } else if (
              this.body.type == "poll" &&
              this.body.quiz &&
              this.body.quiz.questions
            ) {
              let d = this.body.quiz.questions[0];
              this.body.question = {
                id: d.id,
                _id: d.id,
                content: d.content,
                type: d.question_type,
                answers: d.options.map(o => {
                  return {
                    id: o.id,
                    _id: o.id,
                    content:
                    o.content
                  };
                })
              };
            }
            delete this.body.quiz;
          });
    }
  }
};
</script>
