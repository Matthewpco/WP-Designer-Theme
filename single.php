<?php

/*
Template Name: single project template
*/
get_header();

?>


<h1><?php echo $name; ?></h1>

<section id="portfolio-projects">
    <div class="container blog">

    
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <h1><?php the_title(); ?></h1>

        <div class="project-image">
            <div class="img" style="background: url('<?php the_post_thumbnail_url( 'medium' ); ?>'); background-size: cover !important; background-position: center center !important;">
            </div>
        </div>

        <div class="content-area">

            <div class="inside">

                <?php the_content(); ?>
                <?php dynamic_sidebar( 'bottom-sidebar' ); ?>
            </div>

            <div class="right-widgets">
                <?php dynamic_sidebar( 'right-sidebar' ); ?>

            </div>

        </div>
    </div>

      <?php endwhile; ?>
          <?php else : ?>
            <div>
              <h1>Blogs Coming Soon</h1>
            </div>
            <?php endif; ?>
    </section>


<?php get_footer(); ?>