<template>
  <section>
    <div class="video-overlay" v-if="showModal">
      <div class="video-wrapper text-center pt-5">
        <button
          @click="showModal = false"
          style="position:absolute;top:0; right:0; margin:7px;border:0;background:white;font-size:13px"
        >Close</button>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/jHBQruYCckk?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <home-header>
      <div slot="content" class="pt-5">
        <div class="text-center pt-5">
          <h6 class="text-medium text-opacity">INTRODUCING {{$appName.toUpperCase()}}</h6>
          <div class="pt-2">
            <h1>
              Collect
              <span class="bold underline">insightful</span> Feedback
            </h1>
            <h1 class="pt-1">Build Better Products 😍</h1>
          </div>
          <div class="pt-3">
            <h6 class="text-opacity">{{$appName}} is the most efficient way to collect feedback,</h6>
            <h6 class="text-opacity">While iterating and building User-Centered Products</h6>
          </div>
          <div class="pt-3">
            <button
              @click="showModal = true"
              class="button button-primary button-outline button-big"
            >
              <a>
                <span>Watch Video</span>
                <i class="zmdi zmdi-play-circle pl-3"></i>
              </a>
            </button>
            <button class="button button-primary button-big ml-2">
              <router-link :to="{path:'/get-started'}">
                <span>Get Started</span>
                <span class="pl-2">
                  <i class="zmdi zmdi-long-arrow-right"></i>
                </span>
              </router-link>
            </button>
          </div>

          <div class="demoX">
            <div class="demo__header">
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div class="demo_webpage" style="height:inherit;margin-top:20px"></div>
            <div class="widgetX">
              <div class="card ml-2 mr-2 card-content__fields-form" id="widget-gg-basic__feedback">
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
                    style="font-size:15px"
                    class="text-medium text-opacity widget-gg-hover p-2 text-center"
                  >{{'What do you think about Us?'}}</h6>
                  <form class="card-content__fields-form pt-3">
                    <div class="mb-4 feedback_emoji">
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
                    <div class="r mt-5">
                      <div class="control">
                        <textarea type="text" id="x" placeholder="Enter First name"></textarea>
                        <label for="x" class="pl-1 pr-3 pt-2">
                          <h6 class="text-small">{{'What do you think about Us?'}}</h6>
                        </label>
                      </div>
                    </div>
                    <div class="mt-4">
                      <button
                        id="feedback__submit-btnz"
                        disabled
                        type="button"
                        class="button button-primary float-right pl-4 pr-4"
                      >
                        <span>{{'Submit Feedback'}}</span>
                        <span class="pl-2">
                          <i class="zmdi zmdi-long-arrow-right"></i>
                        </span>
                      </button>
                    </div>
                    <div id="widget-gg-basic__feedback-footer">
                      <small class="text-opacity">
                        Powered by
                        <a
                          class="text-primary text-medium"
                          :style="'color:'+'#000000' + '!important'"
                        >{{$appName}}</a>
                      </small>
                    </div>
                  </form>
                </div>
              </div>

              <div class="ml-2 mt-3 mr-2 float-right trigger-button" id="x-trigger-button">
                <span class="icon">
                  <svg
                    width="24"
                    fill="#FFFFFF"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  >
                    <path
                      d="M20 15c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m5.415 4.946c-1 .256-1.989.482-3.324.482-3.465 0-7.091-2.065-7.091-5.423 0-3.128 3.14-5.672 7-5.672 3.844 0 7 2.542 7 5.672 0 1.591-.646 2.527-1.481 3.527l.839 2.686-2.943-1.272zm-13.373-3.375l-4.389 1.896 1.256-4.012c-1.121-1.341-1.909-2.665-1.909-4.699 0-4.277 4.262-7.756 9.5-7.756 5.018 0 9.128 3.194 9.467 7.222-1.19-.566-2.551-.889-3.967-.889-4.199 0-8 2.797-8 6.672 0 .712.147 1.4.411 2.049-.953-.126-1.546-.272-2.369-.483m17.958-1.566c0-2.172-1.199-4.015-3.002-5.21l.002-.039c0-5.086-4.988-8.756-10.5-8.756-5.546 0-10.5 3.698-10.5 8.756 0 1.794.646 3.556 1.791 4.922l-1.744 5.572 6.078-2.625c.982.253 1.932.407 2.85.489 1.317 1.953 3.876 3.314 7.116 3.314 1.019 0 2.105-.135 3.242-.428l4.631 2-1.328-4.245c.871-1.042 1.364-2.384 1.364-3.75"
                    ></path>
                  </svg>
                </span>
                <span>{{'Drop A Feedback'}}</span>
              </div>
            </div>
            <div class="wit">
              <h2>
                <img src="@/assets/images/random.svg">
              </h2>
              <h2>Sample Widget!</h2>
            </div>
          </div>
        </div>
      </div>
    </home-header>
    <div class="container mt-5 pt-5 text-center mb-5" id="howItWorks">
      <h2 class="outline-stroke">How it Works</h2>
      <h6>Getting Onboard takes less than 2 Minutes!!</h6>

      <div class="mt-5 mb-5">
        <div class="row">
          <div class="col-sm-12 col-lg-4 mt-3">
            <div class="how pl-3 pb-4">
              <button class="text-left how-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M17.293 19.663l-1.727.245.523 3.696 1.73-.245-.526-3.696zm2.649-4.132l-.246 1.729 3.698.524.246-1.726-3.698-.527zm.596 6.189l1.232-1.233-2.645-2.642-1.231 1.234 2.644 2.641zm.459-20.916c2.87 1.659 3.854 5.328 2.198 8.196l-2.752 4.767-1.737-1 2.754-4.766c1.104-1.911.447-4.362-1.466-5.464-1.911-1.103-4.362-.447-5.465 1.464l-2.752 4.765-1.735-1 2.752-4.765c1.658-2.87 5.33-3.853 8.203-2.197zm-7.276 19.671l-4.715 2.72c-2.869 1.658-6.543.674-8.203-2.196-1.653-2.87-.673-6.541 2.198-8.196l4.715-2.721 1 1.732-4.713 2.722c-1.911 1.104-2.567 3.554-1.466 5.463 1.107 1.911 3.556 2.567 5.47 1.465l4.712-2.72 1.002 1.731z"
                  ></path>
                </svg>
              </button>
              <div class="pt-5">
                <h3 class="text-bold text-left">Sign up</h3>
                <h6
                  class="text-left pt-2"
                  style="line-height:25px; height:100px"
                >Register with your google account to begin collecting feedback to help your business grow!</h6>
                <div class="text-right pr-2 pt-4">
                  <ul class="shu">
                    <li></li>
                    <li>
                      <small>01/3</small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-lg-4 mt-3">
            <div class="how pl-3 pb-4">
              <button class="text-left how-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M8.997 13.985c.01 1.104-.88 2.008-1.986 2.015-1.105.009-2.005-.88-2.011-1.984-.01-1.105.879-2.005 1.982-2.016 1.106-.007 2.009.883 2.015 1.985zm-.978-3.986c-1.104.008-2.008-.88-2.015-1.987-.009-1.103.877-2.004 1.984-2.011 1.102-.01 2.008.877 2.012 1.982.012 1.107-.88 2.006-1.981 2.016zm7.981-4.014c.004 1.102-.881 2.008-1.985 2.015-1.106.01-2.008-.879-2.015-1.983-.011-1.106.878-2.006 1.985-2.015 1.101-.006 2.005.881 2.015 1.983zm-12 15.847c4.587.38 2.944-4.492 7.188-4.537l1.838 1.534c.458 5.537-6.315 6.772-9.026 3.003zm14.065-7.115c1.427-2.239 5.846-9.748 5.846-9.748.353-.623-.429-1.273-.975-.813 0 0-6.572 5.714-8.511 7.525-1.532 1.432-1.539 2.086-2.035 4.447l1.68 1.4c2.227-.915 2.868-1.04 3.995-2.811zm-12.622 4.806c-2.084-1.82-3.42-4.479-3.443-7.447-.044-5.51 4.406-10.03 9.92-10.075 3.838-.021 6.479 1.905 6.496 3.447l1.663-1.456c-1.01-2.223-4.182-4.045-8.176-3.992-6.623.055-11.955 5.466-11.903 12.092.023 2.912 1.083 5.57 2.823 7.635.958.492 2.123.329 2.62-.204zm12.797-1.906c1.059 1.97-1.351 3.37-3.545 3.992-.304.912-.803 1.721-1.374 2.311 5.255-.591 9.061-4.304 6.266-7.889-.459.685-.897 1.197-1.347 1.586z"
                  ></path>
                </svg>
              </button>
              <div class="pt-5">
                <h3 class="text-bold text-left">Customize</h3>
                <h6
                  class="text-left pt-2"
                  style="line-height:25px; height:100px"
                >Select from our list of feedback Widgets; Poll, Survey or Basic feedback form, and proceed to customizing your widget to suite your taste!</h6>
                <div class="text-right pr-2 pt-4">
                  <ul class="shu">
                    <li></li>
                    <li>
                      <small>02/3</small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-lg-4 mt-3">
            <div class="how pl-3 pb-4">
              <button class="text-left how-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M13.144 8.171c-.035-.066.342-.102.409-.102.074.009-.196.452-.409.102zm-.461 15.795c-.228.013-.453.034-.683.034-6.628 0-12-5.373-12-12s5.372-12 12-12c6.627 0 12 5.373 12 12 0 .23-.021.455-.034.682-.582-.652-1.266-1.209-2.031-1.643-.064-.679-.182-1.293-.306-1.671-.058-.174-.189-.312-.359-.378-.256-.1-1.337.597-1.5.254-.107-.229-.324.146-.572.008-.12-.066-.454-.515-.605-.46-.309.111.474.964.688 1.076.201-.152.852-.465.992-.038.056.166.047.335.009.504-.725-.215-1.489-.334-2.282-.334-2.885 0-5.69 1.602-7.103 4.328-.126.058-.25.121-.381.161-.346.104-.7-.082-1.042-.125-1.407-.178-1.866-1.786-1.499-2.946.037-.19-.114-.542-.048-.689.158-.352.48-.747.762-1.014.158-.15.361-.112.547-.229.287-.181.291-.553.572-.781.4-.325.946-.318 1.468-.388.278-.037 1.336-.266 1.503-.06 0 .038.191.604-.019.572.433.023 1.05.749 1.461.579.211-.088.134-.736.567-.423.262.188 1.436.272 1.68.069.15-.124.234-.93.052-1.021.116.115-.611.124-.679.098-.12-.044-.232.114-.425.025.116.055-.646-.354-.218-.667-.179.131-.346-.037-.539.107-.133.108.062.18-.128.274-.302.153-.53-.525-.644-.602-.116-.076-1.014-.706-.77-.295l.789.785c-.039.025-.207-.286-.207-.059.053-.135.02.579-.104.347-.055-.089.09-.139.006-.268 0-.085-.228-.168-.272-.226-.125-.155-.457-.497-.637-.579-.05-.023-.764.087-.824.11-.07.098-.13.201-.179.311-.148.055-.287.126-.419.214l-.157.353c-.068.061-.765.291-.769.3.029-.075-.487-.171-.453-.321.038-.165.213-.68.168-.868-.048-.197 1.074.284 1.146-.235.029-.225.046-.487-.313-.525.068.008.695-.246.799-.36.146-.168.481-.442.724-.442.284 0 .223-.413.354-.615.131.053-.07.376.087.507-.01-.103.445.057.489.033.105-.055.685-.023.595-.295-.1-.277.051-.195.181-.253-.02.008.245-.454.359-.452-.103-.088-.395.111-.51.102-.305-.024-.176-.52-.061-.665.089-.115-.243-.256-.247-.036-.006.329-.312.627-.241 1.064.108.659-.735-.159-.809-.114-.28.17-.509-.214-.364-.444.148-.235.505-.224.652-.476.104-.178.225-.385.385-.52.535-.449.683-.09 1.216-.041.521.048.176.124.104.324-.069.19.286.258.409.099.07-.092.229-.323.298-.494.089-.222.901-.197.334-.536-.374-.223-2.004-.672-3.096-.672-.236 0-.401.263-.581.412-.356.295-1.268.874-1.775.698-.519-.179-1.63.66-1.808.666-.065.004.004-.634.358-.681-.153.023 1.247-.707 1.209-.859-.046-.18-2.799.822-2.676 1.023.059.092.299.092-.016.294-.18.109-.372.801-.541.801-.505.221-.537-.435-1.099.409l-.894.36c-1.328 1.411-2.247 3.198-2.58 5.183-.013.079.334.226.379.28.112.134.112.712.167.901.138.478.479.744.74 1.179.154.259.41.914.329 1.186.108-.178 1.07.815 1.246 1.022.414.487.733 1.077.061 1.559-.217.156.33 1.129.048 1.368l-.361.093c-.356.219-.195.756.021.982 1.611 1.686 3.809 2.804 6.265 3.037.434.764.989 1.446 1.641 2.027zm3.007-17.337c-.006-.146-.19-.284-.382-.031-.135.174-.111.439-.184.557-.104.175.567.339.567.174.025-.277.732-.063.87-.025.248.069.643-.226.211-.381-.355-.13-.542-.269-.574-.523 0 0 .188-.176.106-.166-.218.027-.614.786-.614.395zm-5.299-1.089c-.084.085.003.14.089.103.125-.055.293-.053.311-.22.015-.148.044-.046.08-.1.035-.053-.067-.138-.11-.146-.064-.014-.108.069-.149.104l-.072.019-.068.087.008.048-.089.105zm.475.344c.096.136.824-.195.708-.176.225-.113.029-.125-.097-.19-.043-.215-.079-.547-.213-.68l.088-.102c-.207-.299-.36.362-.36.362l.108-.031c.064.055-.072.095-.051.136.086.155.021.248.008.332-.014.085-.104.048-.149.093-.053.066.258.075.262.085.011.033-.375.089-.304.171zm13.134 12.116c0 3.313-2.687 6-6 6s-6-2.687-6-6 2.687-6 6-6 6 2.687 6 6zm-3.5-2.5l-6 2.25 3 .75.754 3 2.246-6z"
                  ></path>
                </svg>
              </button>
              <div class="pt-5">
                <h3 class="text-bold text-left">Install</h3>
                <h6
                  class="text-left pt-2"
                  style="line-height:25px; height:100px"
                >Install and start getting insightful feedback from customers, to help you build better products. It's that simple 😄</h6>
                <div class="text-right pr-2 pt-4">
                  <ul class="shu">
                    <li></li>
                    <li>
                      <small>03/3</small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container widget__section mt-5 pt-5 text-center mb-5">
      <h2 class="outline-stroke">Multiple Widgets, Your Choice!</h2>
      <h6>Select your preferred mode of collecting feedback from Users!</h6>

      <div class="row mt-5 pt-5">
        <div class="col-sm-12 widget__section-list">
          <div class="row widget__section-card">
            <div class="col-sm-12 col-lg-6 left p-4 pb-5">
              <h1 class="text-left ws-list_number">1</h1>
              <h2 class="text-left bold">Feedback Widget</h2>
              <h6
                class="text-left"
                style="line-height:25px"
              >Comes in good for quick responses or getting insights about whatsoever feature that's launched. Comes with three templates and fully Customozible experience to help you collect better user feedback.</h6>
              <a href="/get-started">
                <h6 class="pt-5 text-right text-small text-primary text-medium">
                  Get Started
                  <i data-v-fae5bece class="zmdi zmdi-long-arrow-right pl-2"></i>
                </h6>
              </a>
            </div>
            <div class="col-sm-12 col-lg-6 pt-5 right">
              <!-- <h6 class="text-medium">Collect Feedback with Fancy User Experience</h6> -->
              <img
                src="@/assets/images/screenshot2.png"
                style="object-fit: contain;width: 100%;height: 70%;"
              >
            </div>
          </div>
        </div>
        <div class="col-sm-12 widget__section-list mt-5">
          <div class="row widget__section-card">
            <div class="col-sm-12 col-lg-6 left p-4 pb-5">
              <h1 class="text-left ws-list_number">2</h1>
              <h2 class="text-left bold">Survey Widget</h2>
              <h6
                class="text-left"
                style="line-height:25px"
              >Survey Widget allows you ask Questions to your website visitors or users. Comes in handy when trying to conclude on a product decision based on users input on created Survey.</h6>
              <a href="/get-started">
                <h6 class="pt-5 text-right text-small text-primary text-medium">
                  Get Started
                  <i data-v-fae5bece class="zmdi zmdi-long-arrow-right pl-2"></i>
                </h6>
              </a>
            </div>
            <div class="col-sm-12 col-lg-6 pt-5 right">
              <img
                src="@/assets/images/screenshot1.png"
                style="object-fit: contain;width: 100%;height: 70%;"
              >
            </div>
          </div>
        </div>
        <div class="col-sm-12 widget__section-list mt-5">
          <div class="row widget__section-card">
            <div class="col-sm-12 col-lg-6 left p-4 pb-1">
              <h1 class="text-left ws-list_number">3</h1>
              <h2 class="text-left bold">Poll Widget</h2>
              <h6 class="text-left" style="line-height:25px">
                Where should the Cart button appear? - Left, Right? or you want to find out from those using your Product? Well,
                Poll Widget allows you collect feedback in a poll like format where users get to vote on their choice. Similar to Survey, you can set question, with answers to allow users choose from.
              </h6>
              <a href="/get-started">
                <h6 class="pt-5 text-right text-small text-primary text-medium">
                  Get Started
                  <i data-v-fae5bece class="zmdi zmdi-long-arrow-right pl-2"></i>
                </h6>
              </a>
            </div>
            <div class="col-sm-12 col-lg-6 right pt-5">
              <!-- <h6 class="text-medium text-left">Let your users vote for that new feature.</h6> -->
              <img
                src="@/assets/images/screenshot3.png"
                style="object-fit: contain;width: 100%;height: 70%;"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-5 pt-5 text-center mb-5" id="features">
      <h2 class="outline-stroke">Features</h2>
      <h6>A Whole list of stuff to help you get better feedback.</h6>

      <div class="mt-5 mb-5">
        <div class="row">
          <div class="col-sm-12 col-lg-4 mt-3">
            <div class="how pl-3 pb-4">
              <button class="text-left how-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M5 20v2h-2v-2h2zm2-2h-6v6h6v-6zm6-1v5h-2v-5h2zm2-2h-6v9h6v-9zm6-2v9h-2v-9h2zm2-2h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z"
                  ></path>
                </svg>
              </button>
              <div class="pt-5">
                <h3 class="text-bold text-left">Key Metrics</h3>
                <h6
                  class="text-left pt-2"
                  style="line-height:25px; height:100px"
                >A Provided Report on your dashboard to help you compare your response rate to previous month. This would help explain how users respond to your widget</h6>
                <div class="text-right pr-2 pt-5">
                  <ul class="shu">
                    <li></li>
                    <li>
                      <small>01/3</small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-lg-4 mt-3">
            <div class="how pl-3 pb-4">
              <button class="text-left how-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path
                    d="M4.411 14.836l1.078-6.565 1.1 4.726c.109.484.782.539.965.072l.997-2.548.573 1.165s.187.314.498.314h1.378v-1h-1.05l-.956-2.012c-.179-.415-.771-.406-.936.016l-.845 2.16-1.303-5.769c-.059-.265-.275-.395-.49-.395-.229 0-.457.145-.502.425l-1.081 6.665-1.105-4.104c-.123-.49-.814-.519-.972-.032l-.821 3.046h-.939v.984h1.337c.183 0 .381-.147.433-.323l.466-1.506 1.187 4.723c.133.533.9.498.988-.042zm19.589 2.75l-2.831-2.832c.522-.79.831-1.735.831-2.754 0-2.761-2.238-5-5-5s-5 2.239-5 5 2.238 5 5 5c1.019 0 1.964-.309 2.755-.832l2.831 2.832 1.414-1.414zm-10-5.586c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3z"
                  ></path>
                </svg>
              </button>
              <div class="pt-5">
                <h3 class="text-bold text-left">Trend Analysis</h3>
                <h6
                  class="text-left pt-2"
                  style="line-height:25px; height:100px"
                >Track how your users responded to your widget, get a better insight to help you make better product decisions. Track by Country, City, Browser and many more</h6>
                <div class="text-right pr-2 pt-5">
                  <ul class="shu">
                    <li></li>
                    <li>
                      <small>02/3</small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-lg-4 mt-3">
            <div class="how pl-3 pb-4">
              <button class="text-left how-btn">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path
                    d="M24 23h-20c-2.208 0-4-1.792-4-4v-15.694c.313-1.071 1.285-2.306 3-2.306 1.855 0 2.769 1.342 2.995 2.312l.005 1.688h18v18zm-2-16h-16v11s-.587-1-1.922-1c-1.104 0-2.078.896-2.078 2s.896 2 2 2h18v-14zm-2 12h-12v-10h12v10zm-8-9h-3v8h10v-8h-6v3h6v1h-2v3h-1v-3h-3v3h-1v-7z"
                  ></path>
                </svg>
              </button>
              <div class="pt-5">
                <h3 class="text-bold text-left">100% Customizable</h3>
                <h6
                  class="text-left pt-2"
                  style="line-height:25px; height:100px"
                >Want to take how your widget should appear on your website far? We provide a fully customizable experience to help with that</h6>
                <div class="text-right pr-2 pt-5">
                  <ul class="shu">
                    <li></li>
                    <li>
                      <small>03/3</small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5 pt-5 mb-5" id="pricing">
      <h2 class="outline-stroke text-center">Pricing</h2>
      <h6 class="text-center">A feasible price list to help you quickly setup a widget.</h6>

      <payment-plan :ishome="true"></payment-plan>
    </div>
    <div class="container code_section mt-5 pt-5 text-center mb-5">
      <h2 class="outline-stroke">Integration? We got you 💪</h2>
      <h6>With few lines of code and you should start collecting actionable feedback!</h6>
      <div class="row">
        <div class="col-sm-12 col-lg-12">
          <div class="card" style="background:transparent; border:0px; box-shadow:0px !important">
            <div class="card-content__fields">
              <div class="mt-5 mb-5 card-content__fields-codeblock">
                <pre class="p-5 text-left">
                    <code>
                      <!--Start of Embed Script-->
                      <div class="code">
                        <span>{{'<'}}</span>
                        <span class="script pr-1">script</span>
                        <span class="type">{{'type'}}</span>
                        <span class>{{"="}}</span>
                        <span class="pr-1 blue">{{'"text/javascript"'}}</span>
                        <span>{{'>'}}</span>
                      </div>

                      <div class="code" style="margin-top:-40px">
                        <span class="purple">{{'(function(){'}}</span>
                      </div>
                      <div class="code pl-4" style="margin-top:-40px">
                        <span class="type">{{'var'}}</span>
                        <span
  class="blue"
>{{" s1=document.createElement('script'),s0=document.getElementsByTagName('script')[0]; "}}</span>
                      </div>
                      <div class="code pl-4" style="margin-top:-40px">
                        <span class="type">{{'s1.async'}}</span>
                        <span class>{{'='}}</span>
                        <span class="blue">{{"true"}}</span>
                      </div>
                      <div class="code pl-4" style="margin-top:-40px">
                        <span class="type">{{'s1.src'}}</span>
                        <span class>{{'='}}</span>
                        <span
  class="blue"
>{{"https://api.feedmonkey.io/api/v1/0987654321abcdedfg/1-2rVCCHWYMNttpAsnhT7DNMmIwosob3bx3OI10XWUv/embed.js"}}</span>
                      </div>
                      <div class="code pl-4" style="margin-top:-40px">
                        <span class="type">{{'s1.charset'}}</span>
                        <span class>{{'='}}</span>
                        <span class="blue">{{"UTF-8"}}</span>
                      </div>
                      <div class="code pl-4" style="margin-top:-40px">
                        <span class="type">{{"s1.setAttribute('crossorigin','*');"}}</span>
                      </div>
                      <div class="code pl-4" style="margin-top:-40px">
                        <span class="type">{{"s0.parentNode.insertBefore(s1,s0);"}}</span>
                      </div>
                      <div class="code" style="margin-top:-40px">
                        <span class="purple">{{'})();'}}</span>
                      </div>

                      <div class="code" style="margin-top:-40px">
                        <span>{{'<'}}</span>
                        <span class="script">script</span>
                        <span>{{'>'}}</span>
                      </div>

                      <!--End of Embed Script-->
                        <!--End of Embed Script-->
                    </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container widget__section mt-5 mb-5">
      <div class="row">
        <div class="col-sm-12 widget__section-list mt-5">
          <div class="row widget__section-card" style="background:black; color:white">
            <div class="col-sm-12 col-lg-8 left p-4 pb-5">
              <h1 class="text-left bold">Start collecting actionable feedback today!</h1>
              <h6
                class="text-left"
                style="line-height:25px"
              >Register an account today to beginning collecting feedback to help you improve on your product.</h6>
              <button class="button button-primary button-outline button-big mt-3">
                <router-link :to="{path:'/get-started'}">
                  <span>Get Started</span>
                  <span class="pl-2">
                    <i class="zmdi zmdi-long-arrow-right"></i>
                  </span>
                </router-link>
              </button>
            </div>
            <div class="col-sm-12 col-lg-4 right" style="width:100%; padding:0">
              <img src="@/assets/images/a811.svg" style="width:100%; object-fit:contain">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 pt-5 footer">
      <footer>
        <div class="container">
          <div class="row pt-4 pb-5">
            <div class="col-sm-12 col-lg-4">
              <img src="@/assets/images/logo_mark_colour.svg" style="width:60px; margin-left:-10px">
              <h6 class="pt-3 text-medium">{{$appName}}</h6>
              <h6
                class="text-opacity"
                style="font-size:12px;line-height:20px"
              >Helping you collect actionable feedback to help you build better products</h6>
              <h6 class="pt-3">
                <small>Terms</small> ・
                <small>Privacy Policy</small>
              </h6>
            </div>
            <div class="col-sm-12 col-lg-4">
              <ul class="footer-list">
                <li>Quick Links</li>
                <li>
                  <router-link :to="{name: 'Login'}">Login</router-link>
                </li>
                <li>
                  <router-link :to="{name: 'Signup'}">Get Started</router-link>
                </li>
                <li>
                  <router-link :to="{name: 'dashboard'}">My Account</router-link>
                </li>
              </ul>
            </div>
            <div class="col-sm-12 col-lg-4">
              <ul class="footer-list">
                <li>Stay in Touch</li>
                <li>
                  <a href="https://twitter.com/feedmonkey" target="_blank">Follow us on Twitter</a>
                </li>
                <li>
                  <a href="#" target="_blank">Follow us on Medium</a>
                </li>
                <li>
                  <a href="mailto:hello@feedmonkey.io" target="_blank">Send us a mail</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="row pb-5">
            <div class="col-sm-12 text-center">
              <small>All Rights Reserved - &copy; {{$appName}} 2020{{new Date().getFullYear() > 2020 ? ` - ${new Date().getFullYear()}` : ''}}</small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </section>
</template>
<style>
#xmh-100 {
  margin-top: -130px !important;
}
</style>

<style lang="scss" scoped>
.wit {
  position: absolute;
  right: 10%;
  top: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h2:first-child {
    transform: rotate(145deg);
    img {
      width: 50%;
    }
  }
}
.video-overlay {
  position: fixed;
  background: linear-gradient(rgba(20, 20, 20, 0.8), rgba(20, 20, 20, 0.8));
  height: 100%;
  top: 0;
  width: 100%;
  z-index: 4;

  .video-wrapper {
    width: 70vw;
    background: transparent;
    margin: 0 auto;
    height: 100%;
    padding-bottom: 40px;
  }
}
.code {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 15px;
  font-family: Source Code Pro;

  .script {
    color: #f56565;
  }
  .blue {
    color: #68d391;
  }
  .type {
    color: #f6ad55;
  }
  .purple {
    color: #b794f4;
  }
}
.code_section {
  position: relative;

  &::before {
    background: url("../assets/images/triangle_thing.svg");
    content: "";
    // background: url(/img/triangle_thing.edef6b07.svg);
    position: absolute;
    left: -500px;
    height: 100%;
    background-position: inherit;
    background-size: 50%;
    width: 100%;
    background-repeat: no-repeat;
    z-index: -1;
    top: 0;
  }
  &::after {
    background: url("../assets/images/circle.svg");
    content: "";
    // background: url(/img/triangle_thing.edef6b07.svg);
    position: absolute;
    right: -1150px;
    height: 100%;
    background-position: inherit;
    background-size: 50%;
    width: 100%;
    background-repeat: no-repeat;
    z-index: -1;
    top: 0;
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
.footer {
  background: #f5f5f5;
  .footer-list {
    list-style-type: none;
    li {
      font-size: 14px;
      &:not(:first-child) {
        a {
          color: black;
          text-decoration: none;
        }
        padding-top: 15px;
      }
    }
    li:first-child {
      font-family: "graphikMedium";
      font-size: 16px;
    }
  }
}
.logo_square {
  height: 30px;
  width: 30px;
  border-radius: 6px;
  transform: rotate(-20deg);
  border: 0px;
  background: #5b439d;
}
.widget__section {
  .widget__section-list {
    // width: 90%;
  }
  .widget__section-card {
    background: white;
    height: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.09), 0 1px 2px rgba(0, 0, 0, 0.09);
    border-radius: 5px;
    width: 90%;
    margin: 0 auto;
    position: relative;

    .ws-list_number {
      // position: absolute;
      // top: 0;
      margin-top: -70px;
      font-size: 5em !important;
      width: 100%;
      // opacity: .4;
      color: #f5f5f5;
    }

    .right {
      background: #f7f7f7;
    }
  }
}
.shu {
  list-style-type: none;
  display: flex;
  align-items: right;
  text-align: right;
  align-items: flex-start;
  justify-content: flex-end;

  li {
    height: 30px;
    &:first-child {
      height: 20px;
      width: 10px;
      background: -webkit-linear-gradient(#5b439d, #e277dd);
      margin-top: 2px;
      margin-right: 5px;
      border-radius: 2px;
    }
  }
}
.how {
  .how-btn {
    background: -webkit-linear-gradient(#5b439d, #e277dd);
    height: 50px;
    width: 50px;
    border-radius: 50px;
    border: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
    border-top: 1px solid #5b439d;
    svg {
      fill: #fff;
    }
  }
  width: 90%;
  background-color: white;
  border: 2px solid #5b439d;
  height: 100%;
  box-shadow: 10px -10px #b1fcff;
}
.demoX {
  height: 600px;
  background: white;
  border: 1px solid #f7f7f7;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-top: 4.4em;
  position: relative;
  .widgetX {
    width: 400px;
    position: absolute;
    bottom: 0px;
    margin-left: 30px;
  }
  .demo__header {
    height: 40px;
    background: #413e3e;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    margin-top: -15px;

    ul {
      list-style-type: none;
      padding: 0;
      display: flex;
      width: 50px;
      margin-left: 10px;
      justify-content: space-around;
      align-items: center;
      height: 40px;
      li {
        height: 10px;
        width: 10px;
        border-radius: 10px;
        background: red;
        // padding-right: 10px;

        &:first-child {
          background: #f95a53;
        }
        &:nth-child(2) {
          background: #616162;
        }
        &:nth-child(3) {
          background: #53c22a;
        }
      }
    }
  }
}
</style>

<script>
import HomeHeader from "@/components/Layouts/HomeHeader";
import PaymentPlan from "@/views/Onboarding/PaymentPlan";
export default {
  name: "Home",
  title: "Home",
  components: {
    HomeHeader,
    PaymentPlan
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>
