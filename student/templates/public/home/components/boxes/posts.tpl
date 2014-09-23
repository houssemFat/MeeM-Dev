<div id="home_posts_cotainer">
	<ol>
		{foreach from=$posts item=post name=posts}
			<li class="post">
				<h3>
					<a href="{$projectUrl}user.php?id={$post.parent.__jsID}" style="width:350px">
						<img style='width:60;height:60'
									src="{$httpMediaUrl|cat:$post.parent.folder_url|cat:'/profile/'|cat: $post.parent.thamb_img_url}"/>
				
						<span>{$post.parent.name} evaluate</span>
					</a>
				</h3>
				<h3><a href="{$projectUrl}book.php?bid={$post.__jsBOOKID}" style="width:350px">{$post.book_id}</a></h3>
				<p>likes : {$post.likes_nbr}</p>
				<span>at ({$post.date})</span>
			</li>
		{/foreach}
	</ol>
</div>