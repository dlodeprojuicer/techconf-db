export default {
  mounted() {
    console.log("W", FB);
    this.shareRef = window.location.host.includes('localhost') ? `http://techconf-dev.netlify.com/` : window.location.href
  },
  data() {
    return {
      shareRef: '',
      socialMedia: [
        {
          image: 'facebook-black.png',
          name: 'facebook',
        },
        {
          image: 'twitter-black.png',
          name: 'twitter',
        },
        {
          image: 'linkedin-black.png',
          name: 'linkedin',
        },
        {
          image: 'link-black.png',
          name: 'link',
        }
      ]
    }
  },
  methods: {
    // share(platform) {
    //   switch(platform) {
    //     case 'facebook':
    //       FB.ui({
    //         method: 'share',
    //         href: this.shareRef
    //       });
    //     break;
    //     case 'twitter':
    //       window.open(`https://twitter.com/intent/tweet?url=${this.shareRef}&text=${this.article.title}&via=thelulaloop&hashtags=LULALoop,Mobility,TeamTransport,SafeTransport,sustainabletransport`)
    //     break;
    //     case 'linkedin':
    //       window.open(`https://linkedin.com/shareArticle?url=${this.shareRef}&title=${this.article.title} @LULA`)
    //     break;
    //     case 'link':
    //       navigator.clipboard.writeText(this.shareRef).then(() => {
    //         this.$swal({
    //           title: 'Copied!',
    //           text: 'Article link copied to the clipboard.',
    //           icon: 'info',
    //           confirmButtonColor: '#47B17D'
    //         });
    //       }, function(err) {
    //         console.error('Could not copy text: ', err);
    //       });
    //     break;
    //   }
    // }
  }
}