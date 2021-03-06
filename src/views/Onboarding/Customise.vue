<template>
  <section  >
    <Header>
      <h1 slot="title">Customise your Widget</h1>
      <h6 slot="description" class="text-opacity">Style how you want your widget to appear</h6>
    </Header>

    <div class="container no-padd-mobile" >
      <Card :stage="4" v-if="meta && meta.customizations && meta.customizations.trigger">
        <div slot="card-content__fields">
          <form class>
            <div class="row templates" v-if="feedback.type == 'feedback'">
              <div class="col-sm-12">
                <h6 class="text-medium text-opacity">SELECT TEMPLATE</h6>
              </div>
              <div :key="index" v-for="(template, index) in templates" class="col-sm-12 col-lg-3">
                <div
                  class="template"
                  @click="toggleFeedbackTemplate(template.id)"
                  :id="meta.widget_type_id == template.id ? 'selected' : ''"
                >
                  <img :src="template.src">
                  <h6 class="pt-3 text-medium">{{template.name}}</h6>
                </div>
              </div>
            </div>
            <div class="row mt-5 pt-5">
              <div class="col-sm-12 col-lg-6">
                <div class="row card-content__fields-form">
                  <div class="col-sm-12" v-if="feedback.type == 'feedback'">
                    <h6 class="text-medium">Additional Fields (Click to Add)</h6>
                  </div>
                  <div class="col-sm-12" v-if="feedback.type == 'feedback'">
                    <div class="row">
                      <div
                        class="col-sm-6 mt-3"
                        @click="addFields(f.type)"
                        :key="index"
                        v-for="(f,index) in meta.customizations.fields"
                      >
                        <div
                          class="p-2 text-center"
                          :style="{height:'50px',cursor:'pointer',width:'100%', border:f.inview ? '1px dashed #5B439D' : '1px dashed #F5F5F5'}"
                        >
                          <small
                            class="text-opacity"
                            :style="{textTransform: 'capitalize'}"
                          >{{f.type}} field +</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-12 mt-5">
                    <div class="row">
                      <div class="col-sm-8 control">
                        <select id="widget_position" v-model="meta.customizations.widget_pos">
                          <option>bottom-right</option>
                          <option>bottom-left</option>
                          <option>middle-right</option>
                          <option>middle-left</option>
                        </select>
                        <label for="widget_position" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">Position</h6>
                        </label>
                      </div>
                      <div class="col-sm-4 control">
                        <input id="trigger_delay" type="number" v-model="meta.customizations.delay">
                        <label for="trigger_delay" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">Delay (ms)</h6>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 mt-5">
                    <h6 class="text-medium text-center text-opacity">Advanced Settings</h6>

                    <div class="row">
                      <div class="col-sm-12 mt-3 pb-3 pt-3" style="background:#F7F7F7">
                        <h6 class="text-small text-medium">
                          <sup class="pr-2">01</sup>Notification & Tracking
                        </h6>
                      </div>
                      <div class="col-sm-12 mt-4">
                        <input
                          :disabled="$auth.user().plan_id < 4"
                          type="checkbox"
                          id="track"
                          v-model="meta.settings.track_location"
                        >
                        <label for="track" class="pl-2 pr-3 pt-2">
                          <h6 class="text-small">Track User ?</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <input
                          id="trigger_delay"
                          :disabled="$auth.user().plan_id < 4"
                          type="url"
                          v-model="meta.settings.webhook"
                        >
                        <label for="trigger_delay" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Webhook</h6>
                        </label>
                        <small
                          class="text-opacity"
                          style="opacity:.5"
                        >Leave blank if you don't want to use webhook</small>
                      </div>
                      <div class="col-sm-12 mt-5 control">
                        <input
                          id="track_email"
                          :disabled="$auth.user().plan_id < 4"
                          type="email"
                          v-model="meta.settings.email_address"
                        >
                        <label for="trigger_delay" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Email</h6>
                        </label>
                        <small
                          class="text-opacity"
                          style="opacity:.5"
                        >Leave blank if you don't want to receive emails</small>
                      </div>

                      <!-- <div class="col-sm-12 mt-5 control">
                        <multiselect
                          track-by="id"
                          return="id"
                          label="name"
                          v-model="meta.filters.blocked.email"
                          name="blocked_country"
                          :options="countries"
                          :multiple="true"
                          @input="fetchCities"
                          data-vv-as="Country"
                          placeholder="Enter Emails to block"
                        ></multiselect>
                        <label for="trigger_delay" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Email</h6>
                        </label>
                      </div>-->
                      <div class="col-sm-12 mt-5 pb-3 pt-3" style="background:#F7F7F7">
                        <h6 class="text-small text-medium">
                          <sup class="pr-2">02</sup>Block List
                        </h6>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <multiselect
                          track-by="id"
                          return="id"
                          label="name"
                          :disabled="!canSetFilter"
                          v-model="meta.filters.blocked.country"
                          name="blocked_country"
                          :options="countries"
                          :multiple="true"
                          @input="fetchCities"
                          data-vv-as="Country"
                          placeholder="Select Country to Block"
                        ></multiselect>
                        <label for="blocked_country" class="pl-1 pr-3 pt-2" style>
                          <h6 class="text-small">By Country</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <multiselect
                          track-by="id"
                          return="id"
                          label="name"
                          :disabled="!canSetFilter"
                          v-model="meta.filters.blocked.region"
                          name="blocked_region"
                          :options="regions"
                          :multiple="true"
                          data-vv-as="Region"
                          placeholder="Select Region to Block"
                        ></multiselect>
                        <label for="blocked_region" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Region</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <multiselect
                          track-by="id"
                          return="id"
                          :disabled="!canSetFilter"
                          label="name"
                          v-model="meta.filters.blocked.city"
                          name="blocked_city"
                          :options="cities"
                          :multiple="true"
                          data-vv-as="City"
                          placeholder="Select City to Block"
                        ></multiselect>
                        <label for="blocked_region" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By City</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <multiselect
                          track-by="id"
                          return="id"
                          label="name"
                          :disabled="!canSetFilter"
                          v-model="meta.filters.blocked.device_type"
                          name="blocked_device"
                          :options="deviceTypes"
                          :multiple="false"
                          data-vv-as="Device"
                          placeholder="Select Device to Block"
                        ></multiselect>
                        <label for="blocked_region" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Device Type</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <multiselect
                          track-by="id"
                          return="id"
                          label="name"
                          :disabled="!canSetFilter"
                          v-model="meta.filters.blocked.visitor_type"
                          name="blocked_visitor"
                          :options="visitorTypes"
                          :multiple="false"
                          data-vv-as="Visitor"
                          placeholder="Select Visitor to Block"
                        ></multiselect>
                        <label for="blocked_region" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Visitor Type</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <input
                          class="form-control"
                          :disabled="!canSetFilter"
                          v-model="meta.filters.blocked.domain"
                          name="domain_blocked"
                        >
                        <label for="domain_blocked" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Domain (Enter comma separated domains)</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-3 pb-3 pt-3" style="background:#F7F7F7">
                        <h6 class="text-small text-medium">
                          <sup class="pr-2">03</sup>Allow List
                        </h6>
                      </div>

                      <div class="col-sm-12 mt-4 control">
                        <multiselect
                          track-by="id"
                          return="id"
                          label="name"
                          :disabled="!canSetFilter"
                          v-model="meta.filters.allowed.country"
                          name="allowed_country"
                          :options="countries"
                          :multiple="true"
                          @input="fetchCities"
                          data-vv-as="Country"
                          placeholder="Select Country to Allow"
                        ></multiselect>
                        <label for="allowed_country" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Country</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <multiselect
                          track-by="id"
                          return="id"
                          label="name"
                          :disabled="!canSetFilter"
                          v-model="meta.filters.allowed.region"
                          name="allowed_region"
                          :options="regions"
                          :multiple="true"
                          data-vv-as="Region"
                          placeholder="Select Region to Allow"
                        ></multiselect>
                        <label for="allowed_country" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Region</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <multiselect
                          track-by="id"
                          return="id"
                          :disabled="!canSetFilter"
                          label="name"
                          v-model="meta.filters.allowed.city"
                          name="blocked_city"
                          :options="cities"
                          :multiple="true"
                          data-vv-as="City"
                          placeholder="Select City to Block"
                        ></multiselect>
                        <label for="allowed_country" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By City</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <multiselect
                          track-by="id"
                          return="id"
                          label="name"
                          :disabled="!canSetFilter"
                          v-model="meta.filters.allowed.visitor_type"
                          name="blocked_visitor"
                          :options="visitorTypes"
                          :multiple="false"
                          data-vv-as="Visitor"
                          placeholder="Select Visitor to Block"
                        ></multiselect>
                        <label for="allowed_country" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Visitor Type</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <multiselect
                          class="form-control"
                          track-by="id"
                          return="id"
                          label="name"
                          :disabled="!canSetFilter"
                          v-model="meta.filters.allowed.device_type"
                          name="allowed_device"
                          :options="deviceTypes"
                          :multiple="false"
                          data-vv-as="Device"
                          placeholder="Select Device to Allow"
                        ></multiselect>
                        <label for="allowed_country" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Device Type</h6>
                        </label>
                      </div>
                      <div class="col-sm-12 mt-4 control">
                        <input
                          class="form-control"
                          :disabled="!canSetFilter"
                          v-model="meta.filters.allowed.domain"
                          name="allowed_domain"
                        >
                        <label for="allowed_domain" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">By Domain (Enter comma separated domains)</h6>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-lg-6">
                <div class="ml-5 p-4 mt-5" style="border:2px dashed #F5F5F5">
                  <h6 class="text-medium">Customizer Live Preview</h6>
                  <small class="text-opacity">Hover on any element to edit it's property</small>
                </div>
                <div v-if="feedback.type == 'feedback'" class="mt-5 ml-5">
                  <div
                    class="card ml-2 mr-2 card-content__fields-form"
                    id="widget-gg-basic__feedback"
                  >
                    <div class="widget-gg-basic__feedback-head">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div class="p-4 pt-4 pb-4">
                      <h6
                        id="feedback__title2"
                        :style="{fontSize: meta.customizations.tagline_font_size+'px'}"
                        class="text-medium text-opacity widget-gg-hover p-2 text-center"
                      >{{meta.customizations.tagline}}</h6>
                      <b-popover target="feedback__title2" triggers="hover" placement="top">
                        <!-- <template v-slot:title>Popover Title</template> -->
                        <div class="pb-4">
                          <div class="wpop__input">
                            <label for="tagline" class="pr-3 pt-2">
                              <h6 class="text-small">Tagline</h6>
                            </label>
                            <div>
                              <input
                                id="tagline"
                                type="text"
                                :disabled="!canCustomize"
                                class="input"
                                style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                                v-model="meta.customizations.tagline"
                                placeholder="Edit Tagline"
                              >
                            </div>
                          </div>
                          <div class="wpop__input mt-3 pb-3">
                            <label for="tagline_font_size" class="pr-3 pt-2">
                              <h6 class="text-small">Font Size (px)</h6>
                            </label>
                            <div>
                              <input
                                id="tagline_font_size"
                                type="number"
                                class="input"
                                style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                                v-model="meta.customizations.tagline_font_size"
                                :disabled="!canCustomize"
                                placeholder="Enter font size"
                              >
                            </div>
                          </div>
                        </div>
                      </b-popover>
                      <form class="card-content__fields-form pt-3">
                        <div class="mb-4 feedback_emoji" v-show="meta.widget_type_id == 2">
                          <div>
                            <img src="@/assets/images/emoji_1.gif" class="moji" style="width:100%">
                          </div>
                          <div>
                            <img src="@/assets/images/emoji_9.gif" style="width:100%">
                          </div>
                          <div>
                            <img src="@/assets/images/emoji_11.gif" style="width:100%">
                          </div>
                          <div>
                            <img src="@/assets/images/emoji_14.gif" style="width:100%">
                          </div>
                          <div>
                            <img src="@/assets/images/emoji_15.gif" style="width:100%">
                          </div>
                          <div>
                            <img src="@/assets/images/emoji_16.gif" style="width:100%">
                          </div>
                        </div>

                        <div
                          class="thumbs"
                          v-show="meta.widget_type_id == 3"
                          style="display:flex; flex-direction:row; flex-wrap:wrap; justify-content: space-evenly; align-items:center; font-size:40px"
                        >
                          <span class>👍🏼</span>
                          <span class="pt-1">👎🏼</span>
                        </div>
                        <div
                          class="r mt-5"
                          :key="index"
                          v-for="(r,index) in meta.customizations.fields.filter(s =>s.inview)"
                        >
                          <template>
                            <div class="control" :id="'x'+r.type" v-if="r.type === 'message'">
                              <textarea
                                v-model="r.fValue"
                                :id="r.type"
                                :disabled="!canCustomize"
                                type="text"
                                placeholder="Enter Value"
                              ></textarea>
                              <label :for="r.type" class="pl-1 pr-3 pt-2">
                                <h6 class="text-small">{{r.label}}</h6>
                              </label>
                            </div>
                            <div class="control" :id="'x'+r.type" v-else>
                              <input
                                v-model="r.fValue"
                                :disabled="!canCustomize"
                                :id="r.type"
                                placeholder="Enter Password"
                                :type="r.type"
                              >
                              <label :for="r.type" class="pl-1 pr-3 pt-2">
                                <h6 class="text-small">{{r.label}}</h6>
                              </label>
                            </div>
                            <b-popover :target="'x'+r.type" triggers="hover" placement="top">
                              <!-- <template v-slot:title>Popover Title</template> -->
                              <div class="pb-4">
                                <div class="wpop__input">
                                  <label for="tagline_edit" class="pr-3 pt-2">
                                    <h6 class="text-small">Label</h6>
                                  </label>
                                  <div>
                                    <input
                                      id="tagline_edit"
                                      type="text"
                                      class="input"
                                      style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                                      v-model="r.label"
                                      :disabled="!canCustomize"
                                      placeholder="Edit Tagline"
                                    >
                                  </div>
                                </div>
                              </div>
                            </b-popover>
                          </template>
                        </div>
                        <div class="mt-4">
                          <button
                            id="feedback__submit-btn2"
                            type="button"
                            class="button button-primary float-right pl-4 pr-4"
                            :style="{background: meta.customizations.primary_color, color: meta.customizations.secondary_color}"
                          >
                            <span>{{meta.customizations.button_text}}</span>
                            <span class="pl-2">
                              <i class="zmdi zmdi-long-arrow-right"></i>
                            </span>
                          </button>
                          <b-popover
                            target="feedback__submit-btn2"
                            triggers="hover"
                            placement="top"
                          >
                            <!-- <template v-slot:title>Popover Title</template> -->
                            <div class="pb-4">
                              <div class="wpop__input">
                                <label for="button_text" class="pr-3 pt-2">
                                  <h6 class="text-small">Button Text</h6>
                                </label>
                                <div>
                                  <input
                                    id="button_text"
                                    type="text"
                                    class="input"
                                    style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                                    :disabled="!canCustomize"
                                    v-model="meta.customizations.button_text"
                                    placeholder="Edit Tagline"
                                  >
                                </div>
                              </div>
                              <div class="wpop__input mt-3">
                                <label for="tagline" class="pr-3 pt-2">
                                  <h6 class="text-small">Button Color</h6>
                                </label>
                                <div>
                                  <color-picker
                                    :disabled="!canCustomize"
                                    ref="primaryColor"
                                    :colorValue="meta.customizations.primary_color"
                                    @updatePrimaryColor="updatePrimary"
                                  ></color-picker>
                                </div>
                              </div>
                              <div class="wpop__input mt-3 pb-3">
                                <label for="tagline" class="pr-3 pt-2">
                                  <h6 class="text-small">Button Text Color</h6>
                                </label>
                                <div>
                                  <color-picker
                                    ref="primaryTextColor"
                                    :disabled="!canCustomize"
                                    :colorValue="meta.customizations.secondary_color"
                                    @updatePrimaryColor="updateSecondary"
                                  ></color-picker>
                                </div>
                              </div>
                            </div>
                          </b-popover>
                        </div>
                        <div
                          id="widget-gg-basic__feedback-footer2"
                          v-if="$auth.user().plan_id == 1"
                        >
                          <small class="text-opacity">
                            Powered by
                            <a
                              class="text-primary text-medium"
                              :style="'color:'+meta.customizations.primary_color + '!important'"
                            >{{appName}}</a>
                          </small>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    class="ml-2 mt-3 mr-2 float-right trigger-button"
                    id="x-trigger-button"
                    :style="{background:meta.customizations.trigger.background,color:meta.customizations.trigger.text_color,}"
                  >
                    <span
                      class="icon"
                      :style="{background:meta.customizations.trigger.icon_background}"
                      v-html="meta.customizations.trigger.icon"
                    >}</span>
                    <span>{{meta.customizations.trigger.button}}</span>
                  </div>
                  <b-popover target="x-trigger-button" triggers="hover" placement="left">
                    <!-- <template v-slot:title>Popover Title</template> -->
                    <div class="pb-4">
                      <div class="wpop__input">
                        <label for="trigger_button" class="pr-3 pt-2">
                          <h6 class="text-small">Trigger Text</h6>
                        </label>
                        <div>
                          <input
                            id="trigger_button"
                            type="text"
                            class="input"
                            :disabled="!canCustomize"
                            style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                            v-model="meta.customizations.trigger.button"
                            placeholder="Edit Tagline"
                          >
                        </div>
                      </div>
                      <div class="wpop__input mt-3">
                        <label for="tagline" class="pr-3 pt-2">
                          <h6 class="text-small">Button Color</h6>
                        </label>
                        <div>
                          <color-picker
                            ref="primaryColor"
                            :disabled="!canCustomize"
                            :colorValue="meta.customizations.trigger.background"
                            @updatePrimaryColor="(v) => meta.customizations.trigger.background = v.shadow"
                          ></color-picker>
                        </div>
                      </div>
                      <div class="wpop__input mt-3">
                        <label for="tagline" class="pr-3 pt-2">
                          <h6 class="text-small">Button Text Color</h6>
                        </label>
                        <div>
                          <color-picker
                            ref="primaryTextColor"
                            :disabled="!canCustomize"
                            :colorValue="meta.customizations.trigger.text_color"
                            @updatePrimaryColor="(v) => meta.customizations.trigger.text_color = v.x"
                          ></color-picker>
                        </div>
                      </div>
                      <div class="wpop__input mt-3">
                        <label for="tagline" class="pr-3 pt-2">
                          <h6 class="text-small">Button Icon Background</h6>
                        </label>
                        <div>
                          <color-picker
                            ref="primaryTextColor"
                            :disabled="!canCustomize"
                            :colorValue="meta.customizations.trigger.icon_background"
                            @updatePrimaryColor="(v) => {meta.customizations.trigger.icon_background = v.x}"
                          ></color-picker>
                        </div>
                      </div>
                      <div class="wpop__input mt-3 pb-3">
                        <label for="tagline" class="pr-3 pt-2">
                          <h6 class="text-small">Paste Icon or SVG Code</h6>
                        </label>
                        <div>
                          <input
                            id="tagline"
                            type="text"
                            class="input"
                            style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                            value="What do you think about us"
                            v-model="meta.customizations.trigger.icon"
                            placeholder="Edit Tagline"
                          >
                          <div style="width:100%" class="mt-1">
                            <ul class="svg-picker">
                              <li
                                @click="selectIcon(`<svg width='24' fill='#FFFFFF' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path  d='M20 15c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m5.415 4.946c-1 .256-1.989.482-3.324.482-3.465 0-7.091-2.065-7.091-5.423 0-3.128 3.14-5.672 7-5.672 3.844 0 7 2.542 7 5.672 0 1.591-.646 2.527-1.481 3.527l.839 2.686-2.943-1.272zm-13.373-3.375l-4.389 1.896 1.256-4.012c-1.121-1.341-1.909-2.665-1.909-4.699 0-4.277 4.262-7.756 9.5-7.756 5.018 0 9.128 3.194 9.467 7.222-1.19-.566-2.551-.889-3.967-.889-4.199 0-8 2.797-8 6.672 0 .712.147 1.4.411 2.049-.953-.126-1.546-.272-2.369-.483m17.958-1.566c0-2.172-1.199-4.015-3.002-5.21l.002-.039c0-5.086-4.988-8.756-10.5-8.756-5.546 0-10.5 3.698-10.5 8.756 0 1.794.646 3.556 1.791 4.922l-1.744 5.572 6.078-2.625c.982.253 1.932.407 2.85.489 1.317 1.953 3.876 3.314 7.116 3.314 1.019 0 2.105-.135 3.242-.428l4.631 2-1.328-4.245c.871-1.042 1.364-2.384 1.364-3.75'/></svg>`)"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                >
                                  <path
                                    d="M20 15c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m5.415 4.946c-1 .256-1.989.482-3.324.482-3.465 0-7.091-2.065-7.091-5.423 0-3.128 3.14-5.672 7-5.672 3.844 0 7 2.542 7 5.672 0 1.591-.646 2.527-1.481 3.527l.839 2.686-2.943-1.272zm-13.373-3.375l-4.389 1.896 1.256-4.012c-1.121-1.341-1.909-2.665-1.909-4.699 0-4.277 4.262-7.756 9.5-7.756 5.018 0 9.128 3.194 9.467 7.222-1.19-.566-2.551-.889-3.967-.889-4.199 0-8 2.797-8 6.672 0 .712.147 1.4.411 2.049-.953-.126-1.546-.272-2.369-.483m17.958-1.566c0-2.172-1.199-4.015-3.002-5.21l.002-.039c0-5.086-4.988-8.756-10.5-8.756-5.546 0-10.5 3.698-10.5 8.756 0 1.794.646 3.556 1.791 4.922l-1.744 5.572 6.078-2.625c.982.253 1.932.407 2.85.489 1.317 1.953 3.876 3.314 7.116 3.314 1.019 0 2.105-.135 3.242-.428l4.631 2-1.328-4.245c.871-1.042 1.364-2.384 1.364-3.75"
                                  ></path>
                                </svg>
                              </li>
                              <li
                                @click="selectIcon(`<svg fill='#FFFFFF' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path d='M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z'/></svg>`)"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"
                                  ></path>
                                </svg>
                              </li>
                              <li
                                @click="selectIcon(`<svg xmlns='http://www.w3.org/2000/svg' fill='#FFFFFF' width='24' height='24' viewBox='0 0 24 24'><path d='M24 10.162c0-5.06-5.373-9.162-12-9.162s-12 4.102-12 9.162c0 5.097 5.447 9.213 12.121 9.161-.391 2.015-2.765 3.275-4.545 3.677 10.109-.89 16.424-6.489 16.424-12.838z'/></svg>`)"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M24 10.162c0-5.06-5.373-9.162-12-9.162s-12 4.102-12 9.162c0 5.097 5.447 9.213 12.121 9.161-.391 2.015-2.765 3.275-4.545 3.677 10.109-.89 16.424-6.489 16.424-12.838z"
                                  ></path>
                                </svg>
                              </li>
                              <li
                                @click="selectIcon(`<svg xmlns='http://www.w3.org/2000/svg' fill='#FFFFFF' width='24' height='24' viewBox='0 0 24 24'><path d='M0 15.562l1.932-7.562 3.526.891-1.974 7.562-3.484-.891zm18.415.902c.125.287.187.598.155.91-.079.829-.698 1.448-1.457 1.602-.254.533-.733.887-1.285 1.002-.244.512-.722.89-1.296 1.01-.325.668-.97 1.012-1.674 1.012-.516 0-1.004-.183-1.356-.538-.928.404-1.902-.048-2.232-.863-.596-.068-1.107-.452-1.332-.997-.599-.071-1.114-.458-1.34-1.003-1.188-.138-1.848-1.44-1.198-2.495-.233-.058-.494-.104-.751-.152l.383-1.464c.524.1 1.01.219 1.453.358.913-.655 2.151-.295 2.549.679.608.069 1.116.464 1.334 1 .598.068 1.111.451 1.335.998.738.082 1.36.653 1.449 1.434l.002.225.45.402c.252.291.68.324.96.106.286-.223.324-.624.075-.909l-1.457-1.279c-.157-.139.052-.38.213-.241l1.491 1.308c.257.294.692.332.969.114.285-.22.316-.631.068-.916l-1.896-1.628c-.162-.135.048-.38.208-.242l1.944 1.669c.248.282.678.335.967.114.283-.22.349-.606-.002-.995-1.24-1.112-2.671-2.405-4.143-3.796-.355.488-2.176 1.502-3.279 1.502s-1.779-.675-1.96-1.343c-.157-.582.051-1.139.531-1.419.535-.313 1.055-.762 1.562-1.269-.789-.586-1.203-.398-2.067.013-.503.238-1.1.521-1.854.647l.438-1.67c1.327-.488 2.549-1.608 4.505-.083l.491-.552c.395-.447.911-.715 1.503-.715.436 0 .91.161 1.408.417 1.518.793 2.293 1.256 3.443 1.294l.394 1.508h-.008c-1.797.033-2.676-.508-4.516-1.47-.513-.263-.859-.318-1.1-.044-.984 1.12-2.031 2.309-3.192 3.063.573.458 2.019-.458 2.592-.92.25-.201.638-.468 1.128-.468.553 0 .955.331 1.244.619.68.68 2.57 2.389 3.407 3.142.434-.242.868-.435 1.311-.605l.383 1.467c-.319.134-.633.286-.95.461zm-11.037.875l.609-.747c.25-.3.215-.722-.08-.944-.296-.223-.737-.158-.986.14l-.61.749c-.251.298-.214.721.08.942s.737.159.987-.14zm1.328 1.006l.617-.755c.248-.297.213-.722-.082-.943-.294-.221-.734-.159-.984.142l-.616.754c-.251.3-.21.712.086.936.297.222.729.167.979-.134zm1.343.992l.608-.747c.251-.299.215-.721-.08-.944-.296-.222-.735-.157-.986.142l-.609.745c-.251.3-.213.724.082.945.293.221.734.16.985-.141zm1.865-.691c-.294-.224-.735-.159-.987.139l-.612.751c-.249.299-.213.722.082.943.295.221.735.16.986-.142l.61-.75c.253-.297.217-.72-.079-.941zm1.427 1.134l-.24-.212c-.063.239-.173.464-.332.65l-.358.441c.133.106.288.176.448.176.149 0 .295-.046.415-.138.284-.223.317-.632.067-.917zm5.201-10.889l1.974 7.562 3.484-.891-1.932-7.562-3.526.891zm-7.959-6.891l-.986.174.521 2.954.984-.174-.519-2.954zm3.82.174l-.985-.174-.521 2.954.985.174.521-2.954zm3.597 1.228l-.867-.5-1.5 2.598.867.5 1.5-2.598zm-11.133-.5l-.867.5 1.5 2.598.867-.5-1.5-2.598z'/></svg>`)"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M0 15.562l1.932-7.562 3.526.891-1.974 7.562-3.484-.891zm18.415.902c.125.287.187.598.155.91-.079.829-.698 1.448-1.457 1.602-.254.533-.733.887-1.285 1.002-.244.512-.722.89-1.296 1.01-.325.668-.97 1.012-1.674 1.012-.516 0-1.004-.183-1.356-.538-.928.404-1.902-.048-2.232-.863-.596-.068-1.107-.452-1.332-.997-.599-.071-1.114-.458-1.34-1.003-1.188-.138-1.848-1.44-1.198-2.495-.233-.058-.494-.104-.751-.152l.383-1.464c.524.1 1.01.219 1.453.358.913-.655 2.151-.295 2.549.679.608.069 1.116.464 1.334 1 .598.068 1.111.451 1.335.998.738.082 1.36.653 1.449 1.434l.002.225.45.402c.252.291.68.324.96.106.286-.223.324-.624.075-.909l-1.457-1.279c-.157-.139.052-.38.213-.241l1.491 1.308c.257.294.692.332.969.114.285-.22.316-.631.068-.916l-1.896-1.628c-.162-.135.048-.38.208-.242l1.944 1.669c.248.282.678.335.967.114.283-.22.349-.606-.002-.995-1.24-1.112-2.671-2.405-4.143-3.796-.355.488-2.176 1.502-3.279 1.502s-1.779-.675-1.96-1.343c-.157-.582.051-1.139.531-1.419.535-.313 1.055-.762 1.562-1.269-.789-.586-1.203-.398-2.067.013-.503.238-1.1.521-1.854.647l.438-1.67c1.327-.488 2.549-1.608 4.505-.083l.491-.552c.395-.447.911-.715 1.503-.715.436 0 .91.161 1.408.417 1.518.793 2.293 1.256 3.443 1.294l.394 1.508h-.008c-1.797.033-2.676-.508-4.516-1.47-.513-.263-.859-.318-1.1-.044-.984 1.12-2.031 2.309-3.192 3.063.573.458 2.019-.458 2.592-.92.25-.201.638-.468 1.128-.468.553 0 .955.331 1.244.619.68.68 2.57 2.389 3.407 3.142.434-.242.868-.435 1.311-.605l.383 1.467c-.319.134-.633.286-.95.461zm-11.037.875l.609-.747c.25-.3.215-.722-.08-.944-.296-.223-.737-.158-.986.14l-.61.749c-.251.298-.214.721.08.942s.737.159.987-.14zm1.328 1.006l.617-.755c.248-.297.213-.722-.082-.943-.294-.221-.734-.159-.984.142l-.616.754c-.251.3-.21.712.086.936.297.222.729.167.979-.134zm1.343.992l.608-.747c.251-.299.215-.721-.08-.944-.296-.222-.735-.157-.986.142l-.609.745c-.251.3-.213.724.082.945.293.221.734.16.985-.141zm1.865-.691c-.294-.224-.735-.159-.987.139l-.612.751c-.249.299-.213.722.082.943.295.221.735.16.986-.142l.61-.75c.253-.297.217-.72-.079-.941zm1.427 1.134l-.24-.212c-.063.239-.173.464-.332.65l-.358.441c.133.106.288.176.448.176.149 0 .295-.046.415-.138.284-.223.317-.632.067-.917zm5.201-10.889l1.974 7.562 3.484-.891-1.932-7.562-3.526.891zm-7.959-6.891l-.986.174.521 2.954.984-.174-.519-2.954zm3.82.174l-.985-.174-.521 2.954.985.174.521-2.954zm3.597 1.228l-.867-.5-1.5 2.598.867.5 1.5-2.598zm-11.133-.5l-.867.5 1.5 2.598.867-.5-1.5-2.598z"
                                  ></path>
                                </svg>
                              </li>
                              <li
                                @click="selectIcon(`<svg width='24' fill='#FFFFFF' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path d='M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-6-6h-9.667l-5.333 4v-4h-3v-14.001h18v14.001zm-9-4.084h-5v1.084h5v-1.084zm5-2.916h-10v1h10v-1zm0-3h-10v1h10v-1z'/></svg>`)"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                >
                                  <path
                                    d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-6-6h-9.667l-5.333 4v-4h-3v-14.001h18v14.001zm-9-4.084h-5v1.084h5v-1.084zm5-2.916h-10v1h10v-1zm0-3h-10v1h10v-1z"
                                  ></path>
                                </svg>
                              </li>
                              <li
                                @click="selectIcon(`<svg width='24' fill='#FFFFFF' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path d='M.054 23c.971-1.912 2.048-4.538 1.993-6.368-1.308-1.562-2.047-3.575-2.047-5.625 0-5.781 5.662-10.007 12-10.007 6.299 0 12 4.195 12 10.007 0 6.052-6.732 11.704-15.968 9.457-1.677 1.028-5.376 2.066-7.978 2.536zm13.071-6.5h-2.25l.594.391c.077.069.19.109.307.109h.448c.117 0 .23-.04.307-.109l.594-.391zm.021-1h-2.279c-.138 0-.25.112-.25.25 0 .139.112.25.25.25h2.279c.138 0 .25-.112.25-.25s-.112-.25-.25-.25zm.247-.5c0-2.002 1.607-2.83 1.607-4.614 0-1.86-1.501-2.886-3.001-2.886s-2.999 1.025-2.999 2.886c0 1.785 1.607 2.64 1.607 4.614h2.786zm2.477-3.614l1.349.612-.414.911-1.298-.589c.151-.3.276-.607.363-.934zm-7.739 0c.087.332.208.63.36.934l-1.296.589-.414-.911 1.35-.612zm9.369-1.886h-1.594c.073.328.103.665.093 1h1.501v-1zm-9.406 0h-1.594v1h1.502v-.002c-.01-.335.02-.671.092-.998zm6.928-1.714l1.242-.882.579.816-1.252.889c-.146-.291-.336-.566-.569-.823zm-6.044 0c-.23.251-.418.525-.569.822l-1.251-.888.578-.816 1.242.882zm4.435-1.047l.663-1.345.897.443-.664 1.345c-.278-.184-.58-.332-.896-.443zm-2.826 0c-.315.11-.618.257-.897.442l-.663-1.344.897-.442.663 1.344zm1.913-.208c-.334-.039-.654-.041-1-.002v-1.529h1v1.531z'/></svg>`)"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                >
                                  <path
                                    d="M.054 23c.971-1.912 2.048-4.538 1.993-6.368-1.308-1.562-2.047-3.575-2.047-5.625 0-5.781 5.662-10.007 12-10.007 6.299 0 12 4.195 12 10.007 0 6.052-6.732 11.704-15.968 9.457-1.677 1.028-5.376 2.066-7.978 2.536zm13.071-6.5h-2.25l.594.391c.077.069.19.109.307.109h.448c.117 0 .23-.04.307-.109l.594-.391zm.021-1h-2.279c-.138 0-.25.112-.25.25 0 .139.112.25.25.25h2.279c.138 0 .25-.112.25-.25s-.112-.25-.25-.25zm.247-.5c0-2.002 1.607-2.83 1.607-4.614 0-1.86-1.501-2.886-3.001-2.886s-2.999 1.025-2.999 2.886c0 1.785 1.607 2.64 1.607 4.614h2.786zm2.477-3.614l1.349.612-.414.911-1.298-.589c.151-.3.276-.607.363-.934zm-7.739 0c.087.332.208.63.36.934l-1.296.589-.414-.911 1.35-.612zm9.369-1.886h-1.594c.073.328.103.665.093 1h1.501v-1zm-9.406 0h-1.594v1h1.502v-.002c-.01-.335.02-.671.092-.998zm6.928-1.714l1.242-.882.579.816-1.252.889c-.146-.291-.336-.566-.569-.823zm-6.044 0c-.23.251-.418.525-.569.822l-1.251-.888.578-.816 1.242.882zm4.435-1.047l.663-1.345.897.443-.664 1.345c-.278-.184-.58-.332-.896-.443zm-2.826 0c-.315.11-.618.257-.897.442l-.663-1.344.897-.442.663 1.344zm1.913-.208c-.334-.039-.654-.041-1-.002v-1.529h1v1.531z"
                                  ></path>
                                </svg>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-popover>
                </div>

                <div v-else class="mt-5 ml-5">
                  <div
                    class="card ml-2 mr-2 card-content__fields-form"
                    id="widget-gg-basic__feedback"
                  >
                    <div class="widget-gg-basic__feedback-head">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div class="p-4 pt-4 pb-4">
                      <h6
                        id="feedback__title"
                        :style="{fontSize: meta.customizations.tagline_font_size+'px'}"
                        class="text-medium text-opacity widget-gg-hover p-2 text-center"
                      >{{meta.customizations.tagline}}</h6>
                      <b-popover target="feedback__title" triggers="hover" placement="top">
                        <!-- <template v-slot:title>Popover Title</template> -->
                        <div class="pb-4">
                          <div class="wpop__input">
                            <label for="tagline" class="pr-3 pt-2">
                              <h6 class="text-small">Tagline</h6>
                            </label>
                            <div>
                              <input
                                id="tagline"
                                type="text"
                                class="input"
                                style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                                value="What do you think about us"
                                :disabled="!canCustomize"
                                v-model="meta.customizations.tagline"
                                placeholder="Edit Tagline"
                              >
                            </div>
                          </div>
                          <div class="wpop__input mt-3 pb-3">
                            <label for="tagline" class="pr-3 pt-2">
                              <h6 class="text-small">Font Size (px)</h6>
                            </label>
                            <div>
                              <input
                                id="tagline"
                                type="number"
                                class="input"
                                style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                                value="What do you think about us"
                                :disabled="!canCustomize"
                                v-model="meta.customizations.tagline_font_size"
                                placeholder="Enter font size"
                              >
                            </div>
                          </div>
                        </div>
                      </b-popover>
                      <div
                        class="survey_wrapper"
                        v-for="(q,index) in questions"
                        :key="index"
                        v-show="!done"
                      >
                        <div v-if="current_question == index && !q.answered">
                          <h6 class="text-medium" style="padding-top:20px">{{q.title}}</h6>
                          <ul class="survey_wrapper-answers">
                            <li
                              :key="`question_${index}_answer_${k}`"
                              v-for="(answer,k) in q.answers"
                              :class="{option:true,selected: answer.selected}"
                              :id="`question_${index}_answer_${k}`"
                              @click="selectAnswer(index, answer.id, k, `question_${index}_answer_${k}`)"
                            >
                              <span>{{answer.name}} {{answer.selected}}</span>
                              <span>{{feedback.type == 'poll' ? 'x' : '→'}}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div v-show="done" class="text-center">
                        <h2>🎉</h2>
                        <h6
                          class="text-medium pt-3"
                          id="feedback_success_message"
                        >Feedback Sent Successfully</h6>
                        <h6
                          style="width:60%;margin:0 auto;line-height:23px"
                          class="text-opacity text-small"
                        >{{meta.customizations.success_msg}}</h6>
                      </div>

                      <form class="card-content__fields-form pt-1">
                        <div class="mt-1">
                          <button
                            id="feedback__next-btn"
                            type="button"
                            v-if="!completedQuestions"
                            @click="nextQuestion(feedback.type)"
                            class="button button-primary float-right pl-4 pr-4"
                            :style="{background: meta.customizations.primary_color, color: meta.customizations.secondary_color}"
                          >
                            <span>{{meta.customizations.quiz_button_text}}</span>
                            <span class="pl-2">
                              <i class="zmdi zmdi-long-arrow-right"></i>
                            </span>
                          </button>
                          <button
                            id="feedback__submit-btn"
                            v-else-if="completedQuestions && !done"
                            type="button"
                            @click="nextQuestion(feedback.type)"
                            class="button button-primary float-right pl-4 pr-4"
                            :style="{background: meta.customizations.primary_color, color: meta.customizations.secondary_color}"
                          >
                            <span>{{meta.customizations.button_text}}</span>
                            <span class="pl-2">
                              <i class="zmdi zmdi-long-arrow-right"></i>
                            </span>
                          </button>
                          <b-popover target="feedback__next-btn" triggers="hover" placement="top">
                            <!-- <template v-slot:title>Popover Title</template> -->
                            <div class="pb-4">
                              <div class="wpop__input">
                                <label for="tagline" class="pr-3 pt-2">
                                  <h6 class="text-small">Button Text</h6>
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    class="input"
                                    :disabled="!canCustomize"
                                    style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                                    v-model="meta.customizations.quiz_button_text"
                                    placeholder="Edit Next Button"
                                  >
                                </div>
                              </div>
                              <div class="wpop__input mt-3">
                                <label class="pr-3 pt-2">
                                  <h6 class="text-small">Button Color</h6>
                                </label>
                                <div>
                                  <color-picker
                                    ref="primaryColor"
                                    :colorValue="meta.customizations.primary_color"
                                    :disabled="!canCustomize"
                                    @updatePrimaryColor="updatePrimary"
                                  ></color-picker>
                                </div>
                              </div>
                              <div class="wpop__input mt-3 pb-3">
                                <label class="pr-3 pt-2">
                                  <h6 class="text-small">Button Text Color</h6>
                                </label>
                                <div>
                                  <color-picker
                                    ref="primaryTextColor"
                                    :disabled="!canCustomize"
                                    :colorValue="meta.customizations.secondary_color"
                                    @updatePrimaryColor="updateSecondary"
                                  ></color-picker>
                                </div>
                              </div>
                            </div>
                          </b-popover>
                          <b-popover target="feedback__submit-btn" triggers="hover" placement="top">
                            <!-- <template v-slot:title>Popover Title</template> -->
                            <div class="pb-4">
                              <div class="wpop__input">
                                <label for="submitBtn" class="pr-3 pt-2">
                                  <h6 class="text-small">Button Text</h6>
                                </label>
                                <div>
                                  <input
                                    id="submitBtn"
                                    type="text"
                                    class="input"
                                    :disabled="!canCustomize"
                                    style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                                    v-model="meta.customizations.button_text"
                                    placeholder="Edit Submit Button"
                                  >
                                </div>
                              </div>
                            </div>
                          </b-popover>

                          <b-popover
                            target="feedback_success_message"
                            triggers="hover"
                            placement="top"
                          >
                            <!-- <template v-slot:title>Popover Title</template> -->
                            <div class="pb-4">
                              <div class="wpop__input">
                                <label for="tagline" class="pr-3 pt-2">
                                  <h6 class="text-small">Success Message</h6>
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    class="input"
                                    :disabled="!canCustomize"
                                    style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                                    v-model="meta.customizations.success_message"
                                    placeholder="Feedback Sent Successfully"
                                  >
                                </div>
                              </div>
                            </div>
                          </b-popover>
                        </div>
                        <div id="widget-gg-basic__feedback-footer">
                          <small class="text-opacity" v-if="$auth.user().plan_id == 1">
                            Powered by
                            <a
                              class="text-primary text-medium"
                              :style="'color:'+meta.customizations.primary_color + '!important'"
                            >{{appName}}</a>
                          </small>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div
                    class="ml-2 mt-3 mr-2 float-right trigger-button"
                    id="x-trigger-button"
                    :style="{background:meta.customizations.trigger.background,color:meta.customizations.trigger.text_color,}"
                  >
                    <span
                      class="icon"
                      :style="{background:meta.customizations.trigger.icon_background}"
                      v-html="meta.customizations.trigger.icon"
                    ></span>
                    <span>{{meta.customizations.trigger.button}}</span>
                  </div>
                  <b-popover target="x-trigger-button2" triggers="hover" placement="left">
                    <!-- <template v-slot:title>Popover Title</template> -->
                    <div class="pb-4">
                      <div class="wpop__input">
                        <label for="tagline" class="pr-3 pt-2">
                          <h6 class="text-small">Trigger Text</h6>
                        </label>
                        <div>
                          <input
                            type="text"
                            class="input"
                            :disabled="!canCustomize"
                            style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                            value="What do you think about us"
                            v-model="meta.customizations.trigger.button"
                            placeholder="Edit Tagline"
                          >
                        </div>
                      </div>
                      <div class="wpop__input mt-3">
                        <label for="tagline" class="pr-3 pt-2">
                          <h6 class="text-small">Button Color</h6>
                        </label>
                        <div>
                          <color-picker
                            ref="primaryColor"
                            :disabled="!canCustomize"
                            :colorValue="meta.customizations.trigger.background"
                            @updatePrimaryColor="updatePrimary"
                          ></color-picker>
                        </div>
                      </div>
                      <div class="wpop__input mt-3">
                        <label for="tagline" class="pr-3 pt-2">
                          <h6 class="text-small">Button Text Color</h6>
                        </label>
                        <div>
                          <color-picker
                            ref="primaryTextColor"
                            :disabled="!canCustomize"
                            :colorValue="meta.customizations.trigger.text_color"
                            @updatePrimaryColor="updateSecondary"
                          ></color-picker>
                        </div>
                      </div>
                      <div class="wpop__input mt-3">
                        <label for="tagline" class="pr-3 pt-2">
                          <h6 class="text-small">Button Icon Background</h6>
                        </label>
                        <div>
                          <color-picker
                            ref="primaryTextColor"
                            :disabled="!canCustomize"
                            :colorValue="meta.customizations.trigger.icon_background"
                            @updatePrimaryColor="updateSecondary"
                          ></color-picker>
                        </div>
                      </div>
                      <div class="wpop__input">
                        <label class="pr-3 pt-2">
                          <h6 class="text-small">Show Icon?</h6>
                        </label>
                        <div>
                          <input
                            type="checkbox"
                            :disabled="!canCustomize"
                            v-model="meta.customizations.trigger.include_icon"
                          >
                        </div>
                      </div>

                      <div class="wpop__input mt-3 pb-3">
                        <label for="tagline" class="pr-3 pt-2">
                          <h6 class="text-small">Paste Icon or SVG Code</h6>
                        </label>
                        <div>
                          <input
                            id="tagline"
                            type="text"
                            class="input"
                            style="height:35px; width:250px; border:2px solid #F5F5F5;padding-left:10px"
                            value="What do you think about us"
                            v-model="meta.customizations.trigger.icon"
                            placeholder="Edit Tagline"
                          >
                          <div style="width:100%" class="mt-1">
                            <ul class="svg-picker">
                              <li
                                @click="selectIcon(`<svg width='24' fill='#FFFFFF' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path  d='M20 15c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m5.415 4.946c-1 .256-1.989.482-3.324.482-3.465 0-7.091-2.065-7.091-5.423 0-3.128 3.14-5.672 7-5.672 3.844 0 7 2.542 7 5.672 0 1.591-.646 2.527-1.481 3.527l.839 2.686-2.943-1.272zm-13.373-3.375l-4.389 1.896 1.256-4.012c-1.121-1.341-1.909-2.665-1.909-4.699 0-4.277 4.262-7.756 9.5-7.756 5.018 0 9.128 3.194 9.467 7.222-1.19-.566-2.551-.889-3.967-.889-4.199 0-8 2.797-8 6.672 0 .712.147 1.4.411 2.049-.953-.126-1.546-.272-2.369-.483m17.958-1.566c0-2.172-1.199-4.015-3.002-5.21l.002-.039c0-5.086-4.988-8.756-10.5-8.756-5.546 0-10.5 3.698-10.5 8.756 0 1.794.646 3.556 1.791 4.922l-1.744 5.572 6.078-2.625c.982.253 1.932.407 2.85.489 1.317 1.953 3.876 3.314 7.116 3.314 1.019 0 2.105-.135 3.242-.428l4.631 2-1.328-4.245c.871-1.042 1.364-2.384 1.364-3.75'/></svg>`)"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                >
                                  <path
                                    d="M20 15c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m5.415 4.946c-1 .256-1.989.482-3.324.482-3.465 0-7.091-2.065-7.091-5.423 0-3.128 3.14-5.672 7-5.672 3.844 0 7 2.542 7 5.672 0 1.591-.646 2.527-1.481 3.527l.839 2.686-2.943-1.272zm-13.373-3.375l-4.389 1.896 1.256-4.012c-1.121-1.341-1.909-2.665-1.909-4.699 0-4.277 4.262-7.756 9.5-7.756 5.018 0 9.128 3.194 9.467 7.222-1.19-.566-2.551-.889-3.967-.889-4.199 0-8 2.797-8 6.672 0 .712.147 1.4.411 2.049-.953-.126-1.546-.272-2.369-.483m17.958-1.566c0-2.172-1.199-4.015-3.002-5.21l.002-.039c0-5.086-4.988-8.756-10.5-8.756-5.546 0-10.5 3.698-10.5 8.756 0 1.794.646 3.556 1.791 4.922l-1.744 5.572 6.078-2.625c.982.253 1.932.407 2.85.489 1.317 1.953 3.876 3.314 7.116 3.314 1.019 0 2.105-.135 3.242-.428l4.631 2-1.328-4.245c.871-1.042 1.364-2.384 1.364-3.75"
                                  ></path>
                                </svg>
                              </li>
                              <li
                                @click="selectIcon(`<svg fill='#FFFFFF' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path d='M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z'/></svg>`)"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"
                                  ></path>
                                </svg>
                              </li>
                              <li
                                @click="selectIcon(`<svg xmlns='http://www.w3.org/2000/svg' fill='#FFFFFF' width='24' height='24' viewBox='0 0 24 24'><path d='M24 10.162c0-5.06-5.373-9.162-12-9.162s-12 4.102-12 9.162c0 5.097 5.447 9.213 12.121 9.161-.391 2.015-2.765 3.275-4.545 3.677 10.109-.89 16.424-6.489 16.424-12.838z'/></svg>`)"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M24 10.162c0-5.06-5.373-9.162-12-9.162s-12 4.102-12 9.162c0 5.097 5.447 9.213 12.121 9.161-.391 2.015-2.765 3.275-4.545 3.677 10.109-.89 16.424-6.489 16.424-12.838z"
                                  ></path>
                                </svg>
                              </li>
                              <li
                                @click="selectIcon(`<svg xmlns='http://www.w3.org/2000/svg' fill='#FFFFFF' width='24' height='24' viewBox='0 0 24 24'><path d='M0 15.562l1.932-7.562 3.526.891-1.974 7.562-3.484-.891zm18.415.902c.125.287.187.598.155.91-.079.829-.698 1.448-1.457 1.602-.254.533-.733.887-1.285 1.002-.244.512-.722.89-1.296 1.01-.325.668-.97 1.012-1.674 1.012-.516 0-1.004-.183-1.356-.538-.928.404-1.902-.048-2.232-.863-.596-.068-1.107-.452-1.332-.997-.599-.071-1.114-.458-1.34-1.003-1.188-.138-1.848-1.44-1.198-2.495-.233-.058-.494-.104-.751-.152l.383-1.464c.524.1 1.01.219 1.453.358.913-.655 2.151-.295 2.549.679.608.069 1.116.464 1.334 1 .598.068 1.111.451 1.335.998.738.082 1.36.653 1.449 1.434l.002.225.45.402c.252.291.68.324.96.106.286-.223.324-.624.075-.909l-1.457-1.279c-.157-.139.052-.38.213-.241l1.491 1.308c.257.294.692.332.969.114.285-.22.316-.631.068-.916l-1.896-1.628c-.162-.135.048-.38.208-.242l1.944 1.669c.248.282.678.335.967.114.283-.22.349-.606-.002-.995-1.24-1.112-2.671-2.405-4.143-3.796-.355.488-2.176 1.502-3.279 1.502s-1.779-.675-1.96-1.343c-.157-.582.051-1.139.531-1.419.535-.313 1.055-.762 1.562-1.269-.789-.586-1.203-.398-2.067.013-.503.238-1.1.521-1.854.647l.438-1.67c1.327-.488 2.549-1.608 4.505-.083l.491-.552c.395-.447.911-.715 1.503-.715.436 0 .91.161 1.408.417 1.518.793 2.293 1.256 3.443 1.294l.394 1.508h-.008c-1.797.033-2.676-.508-4.516-1.47-.513-.263-.859-.318-1.1-.044-.984 1.12-2.031 2.309-3.192 3.063.573.458 2.019-.458 2.592-.92.25-.201.638-.468 1.128-.468.553 0 .955.331 1.244.619.68.68 2.57 2.389 3.407 3.142.434-.242.868-.435 1.311-.605l.383 1.467c-.319.134-.633.286-.95.461zm-11.037.875l.609-.747c.25-.3.215-.722-.08-.944-.296-.223-.737-.158-.986.14l-.61.749c-.251.298-.214.721.08.942s.737.159.987-.14zm1.328 1.006l.617-.755c.248-.297.213-.722-.082-.943-.294-.221-.734-.159-.984.142l-.616.754c-.251.3-.21.712.086.936.297.222.729.167.979-.134zm1.343.992l.608-.747c.251-.299.215-.721-.08-.944-.296-.222-.735-.157-.986.142l-.609.745c-.251.3-.213.724.082.945.293.221.734.16.985-.141zm1.865-.691c-.294-.224-.735-.159-.987.139l-.612.751c-.249.299-.213.722.082.943.295.221.735.16.986-.142l.61-.75c.253-.297.217-.72-.079-.941zm1.427 1.134l-.24-.212c-.063.239-.173.464-.332.65l-.358.441c.133.106.288.176.448.176.149 0 .295-.046.415-.138.284-.223.317-.632.067-.917zm5.201-10.889l1.974 7.562 3.484-.891-1.932-7.562-3.526.891zm-7.959-6.891l-.986.174.521 2.954.984-.174-.519-2.954zm3.82.174l-.985-.174-.521 2.954.985.174.521-2.954zm3.597 1.228l-.867-.5-1.5 2.598.867.5 1.5-2.598zm-11.133-.5l-.867.5 1.5 2.598.867-.5-1.5-2.598z'/></svg>`)"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M0 15.562l1.932-7.562 3.526.891-1.974 7.562-3.484-.891zm18.415.902c.125.287.187.598.155.91-.079.829-.698 1.448-1.457 1.602-.254.533-.733.887-1.285 1.002-.244.512-.722.89-1.296 1.01-.325.668-.97 1.012-1.674 1.012-.516 0-1.004-.183-1.356-.538-.928.404-1.902-.048-2.232-.863-.596-.068-1.107-.452-1.332-.997-.599-.071-1.114-.458-1.34-1.003-1.188-.138-1.848-1.44-1.198-2.495-.233-.058-.494-.104-.751-.152l.383-1.464c.524.1 1.01.219 1.453.358.913-.655 2.151-.295 2.549.679.608.069 1.116.464 1.334 1 .598.068 1.111.451 1.335.998.738.082 1.36.653 1.449 1.434l.002.225.45.402c.252.291.68.324.96.106.286-.223.324-.624.075-.909l-1.457-1.279c-.157-.139.052-.38.213-.241l1.491 1.308c.257.294.692.332.969.114.285-.22.316-.631.068-.916l-1.896-1.628c-.162-.135.048-.38.208-.242l1.944 1.669c.248.282.678.335.967.114.283-.22.349-.606-.002-.995-1.24-1.112-2.671-2.405-4.143-3.796-.355.488-2.176 1.502-3.279 1.502s-1.779-.675-1.96-1.343c-.157-.582.051-1.139.531-1.419.535-.313 1.055-.762 1.562-1.269-.789-.586-1.203-.398-2.067.013-.503.238-1.1.521-1.854.647l.438-1.67c1.327-.488 2.549-1.608 4.505-.083l.491-.552c.395-.447.911-.715 1.503-.715.436 0 .91.161 1.408.417 1.518.793 2.293 1.256 3.443 1.294l.394 1.508h-.008c-1.797.033-2.676-.508-4.516-1.47-.513-.263-.859-.318-1.1-.044-.984 1.12-2.031 2.309-3.192 3.063.573.458 2.019-.458 2.592-.92.25-.201.638-.468 1.128-.468.553 0 .955.331 1.244.619.68.68 2.57 2.389 3.407 3.142.434-.242.868-.435 1.311-.605l.383 1.467c-.319.134-.633.286-.95.461zm-11.037.875l.609-.747c.25-.3.215-.722-.08-.944-.296-.223-.737-.158-.986.14l-.61.749c-.251.298-.214.721.08.942s.737.159.987-.14zm1.328 1.006l.617-.755c.248-.297.213-.722-.082-.943-.294-.221-.734-.159-.984.142l-.616.754c-.251.3-.21.712.086.936.297.222.729.167.979-.134zm1.343.992l.608-.747c.251-.299.215-.721-.08-.944-.296-.222-.735-.157-.986.142l-.609.745c-.251.3-.213.724.082.945.293.221.734.16.985-.141zm1.865-.691c-.294-.224-.735-.159-.987.139l-.612.751c-.249.299-.213.722.082.943.295.221.735.16.986-.142l.61-.75c.253-.297.217-.72-.079-.941zm1.427 1.134l-.24-.212c-.063.239-.173.464-.332.65l-.358.441c.133.106.288.176.448.176.149 0 .295-.046.415-.138.284-.223.317-.632.067-.917zm5.201-10.889l1.974 7.562 3.484-.891-1.932-7.562-3.526.891zm-7.959-6.891l-.986.174.521 2.954.984-.174-.519-2.954zm3.82.174l-.985-.174-.521 2.954.985.174.521-2.954zm3.597 1.228l-.867-.5-1.5 2.598.867.5 1.5-2.598zm-11.133-.5l-.867.5 1.5 2.598.867-.5-1.5-2.598z"
                                  ></path>
                                </svg>
                              </li>
                              <li
                                @click="selectIcon(`<svg width='24' fill='#FFFFFF' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path d='M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-6-6h-9.667l-5.333 4v-4h-3v-14.001h18v14.001zm-9-4.084h-5v1.084h5v-1.084zm5-2.916h-10v1h10v-1zm0-3h-10v1h10v-1z'/></svg>`)"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                >
                                  <path
                                    d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-6-6h-9.667l-5.333 4v-4h-3v-14.001h18v14.001zm-9-4.084h-5v1.084h5v-1.084zm5-2.916h-10v1h10v-1zm0-3h-10v1h10v-1z"
                                  ></path>
                                </svg>
                              </li>
                              <li
                                @click="selectIcon(`<svg width='24' fill='#FFFFFF' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path d='M.054 23c.971-1.912 2.048-4.538 1.993-6.368-1.308-1.562-2.047-3.575-2.047-5.625 0-5.781 5.662-10.007 12-10.007 6.299 0 12 4.195 12 10.007 0 6.052-6.732 11.704-15.968 9.457-1.677 1.028-5.376 2.066-7.978 2.536zm13.071-6.5h-2.25l.594.391c.077.069.19.109.307.109h.448c.117 0 .23-.04.307-.109l.594-.391zm.021-1h-2.279c-.138 0-.25.112-.25.25 0 .139.112.25.25.25h2.279c.138 0 .25-.112.25-.25s-.112-.25-.25-.25zm.247-.5c0-2.002 1.607-2.83 1.607-4.614 0-1.86-1.501-2.886-3.001-2.886s-2.999 1.025-2.999 2.886c0 1.785 1.607 2.64 1.607 4.614h2.786zm2.477-3.614l1.349.612-.414.911-1.298-.589c.151-.3.276-.607.363-.934zm-7.739 0c.087.332.208.63.36.934l-1.296.589-.414-.911 1.35-.612zm9.369-1.886h-1.594c.073.328.103.665.093 1h1.501v-1zm-9.406 0h-1.594v1h1.502v-.002c-.01-.335.02-.671.092-.998zm6.928-1.714l1.242-.882.579.816-1.252.889c-.146-.291-.336-.566-.569-.823zm-6.044 0c-.23.251-.418.525-.569.822l-1.251-.888.578-.816 1.242.882zm4.435-1.047l.663-1.345.897.443-.664 1.345c-.278-.184-.58-.332-.896-.443zm-2.826 0c-.315.11-.618.257-.897.442l-.663-1.344.897-.442.663 1.344zm1.913-.208c-.334-.039-.654-.041-1-.002v-1.529h1v1.531z'/></svg>`)"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                >
                                  <path
                                    d="M.054 23c.971-1.912 2.048-4.538 1.993-6.368-1.308-1.562-2.047-3.575-2.047-5.625 0-5.781 5.662-10.007 12-10.007 6.299 0 12 4.195 12 10.007 0 6.052-6.732 11.704-15.968 9.457-1.677 1.028-5.376 2.066-7.978 2.536zm13.071-6.5h-2.25l.594.391c.077.069.19.109.307.109h.448c.117 0 .23-.04.307-.109l.594-.391zm.021-1h-2.279c-.138 0-.25.112-.25.25 0 .139.112.25.25.25h2.279c.138 0 .25-.112.25-.25s-.112-.25-.25-.25zm.247-.5c0-2.002 1.607-2.83 1.607-4.614 0-1.86-1.501-2.886-3.001-2.886s-2.999 1.025-2.999 2.886c0 1.785 1.607 2.64 1.607 4.614h2.786zm2.477-3.614l1.349.612-.414.911-1.298-.589c.151-.3.276-.607.363-.934zm-7.739 0c.087.332.208.63.36.934l-1.296.589-.414-.911 1.35-.612zm9.369-1.886h-1.594c.073.328.103.665.093 1h1.501v-1zm-9.406 0h-1.594v1h1.502v-.002c-.01-.335.02-.671.092-.998zm6.928-1.714l1.242-.882.579.816-1.252.889c-.146-.291-.336-.566-.569-.823zm-6.044 0c-.23.251-.418.525-.569.822l-1.251-.888.578-.816 1.242.882zm4.435-1.047l.663-1.345.897.443-.664 1.345c-.278-.184-.58-.332-.896-.443zm-2.826 0c-.315.11-.618.257-.897.442l-.663-1.344.897-.442.663 1.344zm1.913-.208c-.334-.039-.654-.041-1-.002v-1.529h1v1.531z"
                                  ></path>
                                </svg>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-popover>
                </div>
              </div>
            </div>
            <div class="mt-5 pt-5">
              <div class="card-content__fields-form__footer mt-5">
                <button
                  type="button"
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
      <div v-else><h3>Loading customizer...</h3></div>
    </div>
  </section>

</template>

<style lang="scss" scoped>
.multiselect {
  box-sizing: border-box !important;
}
.thumbs {
  justify-content: space-evenly !important;
  span {
    cursor: pointer;
    height: 60px;
    width: 60px;
    border-radius: 60px;
    font-size: 35px;
    align-content: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;

    &:not(.selected) {
      filter: grayscale(10);
    }
  }
  span:hover {
    border: 2px solid #5b439d;
    filter: grayscale(0);
  }
}
.templates {
  .template {
    height: 100%;
    width: 100%;
    // background: red;
    border: 2px solid #f5f5f5;
    cursor: pointer;

    &#selected {
      border: 2px solid #5b439d;

      h6 {
        color: #5b439d;
      }
    }

    border-radius: 4px;

    img {
      height: inherit;
      width: inherit;
      object-fit: contain;
    }
  }
}
.card {
  &#widget-gg-basic__feedback {
    border-radius: 4px;

    #widget-gg-basic__feedback-footer {
      margin-top: 20px;
      padding-top: 50px;
      text-align: center;
    }
    #widget-gg-basic__feedback-footer2 {
      margin-top: 20px;
      padding-top: 50px;
      text-align: center;
    }
  }
  &#widget-gg-basic__feedback2 {
    border-radius: 4px;

    #widget-gg-basic__feedback-footer {
      margin-top: 20px;
      padding-top: 50px;
      text-align: center;
    }
    #widget-gg-basic__feedback-footer2 {
      margin-top: 20px;
      padding-top: 50px;
      text-align: center;
    }
  }
}
.feedback_emoji {
  img {
    filter: grayscale(10);
    border-radius: 100%;
    border: 2px solid transparent;
    width: 90% !important;
    cursor: pointer;

    &:hover {
      border: 2px solid #5b439d !important;
      /* opacity: 0.5; */
      filter: grayscale(0);
    }
  }
}
.xtooltip {
  position: relative;
  display: inline-block;
}
.xtooltiptext {
  visibility: hidden;
  width: 80px;
  bottom: 100%;
  left: 50%;
  margin-left: -40px; /* Use half of the width (120/2 = 60), to center the tooltip */
  font-size: 12px;
  /* padding-top: 5px;
        padding-bottom: 5px; */
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 8px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}
.xtooltip:hover .xtooltiptext {
  visibility: visible;
}
.xtooltip:hover .xtooltiptext::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
.templates {
  .template {
    height: 100%;
    width: 100%;
    // background: red;
    border: 2px solid #f5f5f5;
    cursor: pointer;

    &#selected {
      border: 2px solid #5b439d;

      h6 {
        color: #5b439d;
      }
    }

    border-radius: 4px;

    img {
      height: inherit;
      width: inherit;
      object-fit: contain;
    }
  }
}
.card {
  &#widget-gg-basic__feedback {
    border-radius: 4px;

    #widget-gg-basic__feedback-footer {
      margin-top: 20px;
      padding-top: 50px;
      text-align: center;
    }
  }
}
ul {
  &.svg-picker {
    list-style-type: none;
    padding: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: repeat(3, 50px);

    li {
      border: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background: black;
        svg {
          fill: #ffffff;
        }
      }
    }
  }
}
</style>

<script>
import Header from "@/components/Layouts/Header";
import Card from "@/components/Cards";
import ColorPicker from "@/components/ColorPicker";
import swal from "sweetalert";
import { handleApiError } from "@/helpers/general";

export default {
  title: "Customise - Onboarding",
  name: "Customise",
  components: { Header, Card, ColorPicker },
  data() {
    return {
      cities: [],
      visitorTypes: [{ id: 1, name: "new" }, { id: 2, name: "returning" }],
      deviceTypes: [{ id: 1, name: "mobile" }, { id: 2, name: "non-mobile" }],
      loading: false,
      done: false,
      completedQuestions: false,
      question: {},
      quiz: {},
      current_question: 0,
      meta: {
        customizations: {},
        settings: {},
        filters: {
          blocked: {
            country: "",
            region: "",
            city: ""
          },
          allowed: {
            country: {},
            region: {},
            city: {}
          }
        }
      }
    };
  },
  methods: {
    handleApiError,
    nextQuestion(type) {
      if (this.completedQuestions) {
        this.done = true;
        return;
      }
      this.current_question++;
      this.completedQuestions =
        type == "poll" || this.questions.length == this.current_question;

      if (this.completedQuestions) {
        this.meta.customizations.quiz_button_text = "Submit";
      }
    },
    selectIcon(svg) {
      this.meta.customizations.trigger.icon = svg;
    },
    selectAnswer(index, aId, aIndex, answerElementId) {
      //this.questions[index].answered = true;
      this.questions[index].answers[aIndex].selected = true;
      document
        .querySelectorAll(".option")
        .forEach(e => (e.style.fontWeight = null));
      document.getElementById(answerElementId).style.fontWeight = "bold";
    },
    proceed() {
      this.loading = true;
      let data = {};
      Object.assign(data, this.feedback);
      data.meta = {};
      Object.assign(data.meta, this.meta);
      //console.log(JSON.stringify(this.meta, null, 4));

      data.meta.filters.allowed.device_type = data.meta.filters.allowed
        .device_type
        ? data.meta.filters.allowed.device_type.id
        : null;
      data.meta.filters.allowed.visitor_type = data.meta.filters.allowed
        .visitor_type
        ? data.meta.filters.allowed.visitor_type.id
        : null;

      data.meta.filters.allowed.country_codes = data.meta.filters.allowed
        .country
        ? data.meta.filters.allowed.country.map(s => s.iso3).join(",")
        : "";
      data.meta.filters.allowed.region_codes = data.meta.filters.allowed.region
        ? data.meta.filters.allowed.region.map(s => s.code).join(",")
        : "";
      data.meta.filters.allowed.city_names = data.meta.filters.allowed.city
        ? data.meta.filters.allowed.city.map(s => s.name).join("|")
        : "";

      data.meta.filters.blocked.country_codes = data.meta.filters.blocked
        .country
        ? data.meta.filters.blocked.country.map(s => s.iso3).join(",")
        : "";
      data.meta.filters.blocked.region_codes = data.meta.filters.blocked.region
        ? data.meta.filters.blocked.region.map(s => s.state_code).join(",")
        : "";
      data.meta.filters.blocked.city_names = data.meta.filters.blocked.city
        ? data.meta.filters.blocked.city.map(s => s.name).join("|")
        : "";

      delete data.meta.filters.blocked.country;
      delete data.meta.filters.blocked.region;
      delete data.meta.filters.blocked.city;

      delete data.meta.filters.allowed.city;
      delete data.meta.filters.allowed.country;
      delete data.meta.filters.allowed.region;

      this.$store
        .dispatch("feedbacks/createUpdate", data)
        .then(data => {
          let innerHtml = `<span>Widget Customization Saved Successfully`;
          let html = document.createElement("div");
          html.innerHTML = innerHtml;
          swal({
            title: "Proceed to embed code?",
            content: html,
            buttons: ["Nah", "Sure, go ahead"],
            icon: "warning"
          }).then(confirm => {
            if (confirm) {
              this.$router.push({ name: "Embed", params: { id: data.id } });
            }
          });
        })
        .catch(err => {
          let vm = this;
          handleApiError(vm, err, "Action failed. Please try again.");
        })
        .finally(() => (this.loading = false));
    },
    toggleFeedbackTemplate(id) {
      this.meta.widget_type_id = id;
    },
    updatePrimary(v) {
      this.meta.customizations.primary_color = v.x;
    },
    updateSecondary(v) {
      this.meta.customizations.secondary_color = v.x;
    },
    addFields(type) {
      let field = this.meta.customizations.fields.find(s => s.type == type);
      field.inview = !field.inview;
    },
    fetchCities(countries) {
      for (let country of countries) {
        this.$store.dispatch("global/fetchCities", country.id).then(data => {
          this.cities = [this.cities, ...data];
        });
      }
    },
    setCountries(countryCodes) {
      let country = [];
      if (countryCodes) {
        for (let code of countryCodes) {
          let c = this.countries.find(s => s.iso3 == code);
          if (c) {
            country.push(c);
          }
        }
      }

      return country;
    },
    setCities(cityCodes) {
      let city = [];

      if (cityCodes) {
        for (let code of cityCodes) {
          let c = this.cities.find(s => s.name == code);

          if (c) {
            city.push(c);
          }
        }
      }
      return city;
    },
    setRegions(regionCodes) {
      let region = [];

      if (regionCodes) {
        for (let code of regionCodes) {
          let c = this.regions.find(s => s.code == code);

          if (c) {
            region.push(c);
          }
        }
      }
      return region;
    }
  },
  computed: {
    feedback() {
      return this.$store.getters["feedbacks/feedback"];
    },
    questions() {
      let data =
        this.feedback.quiz && this.feedback.quiz.questions
          ? this.feedback.quiz.questions
          : [];
      return data.map(s => {
        return {
          id: s.id,
          title: s.content,
          answers: s.options.map(d => {
            return { id: d.id, name: d.content };
          }),
          answered: false,
          selected_answer: ""
        };
      });
    },

    templates() {
      return [
        {
          id: 1,
          src: "/img/basic_feedback.svg",
          name: "Basic Feedback"
        },
        {
          id: 2,
          name: "Emoji Feedback",
          src: "/img/emoji_feedback.svg"
        },
        {
          id: 3,
          src: "/img/thumbs_feedback.svg",
          name: "Reaction Feedback"
        }
      ];
    },
    countries() {
      return this.$store.getters["global/countries"];
    },
    regions() {
      let data = [];
      let countries1 =
        this.meta &&
        this.meta.filters &&
        this.meta.filters.blocked &&
        this.meta.filters.blocked.country
          ? typeof this.meta.filters.blocked.country === "string"
            ? this.meta.filters.blocked.country.split(",")
            : this.meta.filters.blocked.country.map(s => s.name)
          : [];
      let countries2 =
        this.meta &&
        this.meta.filters &&
        this.meta.filters.allowed &&
        this.meta.filters.allowed.country
          ? typeof this.meta.filters.allowed.country === "string"
            ? this.meta.filters.allowed.country.split(",")
            : this.meta.filters.allowed.country.map(s => s.name)
          : [];
      console.log(countries1, countries2);
      let countries = countries1.concat(countries2);

      for (let country of countries) {
        let regionArray = country.regions || [];
        data = data.concat(regionArray);
      }
      return data;
    },
    canSetFilter() {
      return this.$auth.user().plan_id > 3;
    },
    canCustomize() {
      return this.$auth.user().plan_id > 1;
    },
    appName() {
      return this.$appName;
    }
  },
  created() {
    this.$store
      .dispatch("feedbacks/fetchSingle", this.$route.params.id)
      .then(data => {
        this.meta = data.meta;

        // set locations
        this.meta.filters.allowed.country = this.setCountries(
          this.meta.filters.allowed.country_codes.split(",")
        );
        this.meta.filters.blocked.country = this.setCountries(
          this.meta.filters.blocked.country_codes.split(",")
        );
        this.meta.filters.allowed.city = this.setCities(
          this.meta.filters.allowed.city_names.split(",")
        );
        this.meta.filters.blocked.city = this.setCities(
          this.meta.filters.blocked.city_names.split(",")
        );
        this.meta.filters.blocked.region = this.setRegions(
          this.meta.filters.blocked.region_codes.split(",")
        );
        this.meta.filters.allowed.region = this.setCities(
          this.meta.filters.allowed.region_codes.split(",")
        );

        this.meta.customizations.tagline = this.meta.customizations.tagline || this.feedback.description || this.feedback.name;

        if (this.feedback.quiz) {
          if (
            this.feedback.type == "poll" ||
            this.feedback.quiz.questions.length == 1
          ) {
            this.completedQuestions = true;
          }

          this.quiz = this.feedback.quiz;
          this.question = this.feedback.quiz.questions[0];
        }
      });
    this.templates.length || this.$store.dispatch("global/fetchTemplates");
    this.countries.length || this.$store.dispatch("global/fetchCountries");
    if (!this.meta.widget_type_id) {
      this.meta.widget_type_id = 2;
    }
  }
};
</script>
