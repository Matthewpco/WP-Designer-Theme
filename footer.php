

<footer>

<?php 
  $user_info_pod = pods('user_info', 'matthew');
  $github= $user_info_pod->field('github');
  ?>



      <div class="social-container">
        <a href="http://www.facebook.com/">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="<?php echo $github ?>">
          <i class="fab fa-dribbble"></i>
        </a>
        <a href="http://www.facebook.com/">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="http://www.facebook.com/">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
      <h5>Matthew Payne</h5>
      <h6>Web Developer</h6>

    </footer>

    <script type="module" src="<?php echo get_bloginfo('template_directory'); ?>/js/app.js"></script>

  <?php wp_footer(); ?>
  </body>
</html>
