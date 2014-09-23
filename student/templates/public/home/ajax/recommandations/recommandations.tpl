<style>
	h2.title {
		-moz-background-clip: border;
		-moz-background-inline-policy: continuous;
		-moz-background-origin: padding;
		background: rgb(44, 194, 223);
		color: #FFFFFF;
		font-family: arial;
		font-size: 18px;
		font-size-adjust: none;
		font-stretch: normal;
		font-style: normal;
		font-variant: normal;
		font-weight: bold;
		letter-spacing: -1px;
		line-height: 1.4em;
		text-transform: none;
	}
	div.recommandations-container{
		border-radius: 3px;
		padding: 5px;
		border: solid 4px rgb(204, 204, 133);
		margin-top: 2px;
	}
</style>
<h2 class="title">book trends</h2>
{foreach item=book from=$related_books name=page}
		<span style="">
			<a class="hand" href="{$projectUrl}book.php?bid={$book.__jsID}">
					<span>{$book.title}</span>
			</a>
		</span>
{/foreach}
<h2 class="title"> Authors trends </h2>
{foreach item=author from=$related_authors name=page}
		<div style="" 
		class="book-item inline-block">
			<a class="hand" href="{$projectUrl}author.php?bid={$author.__jsID}">
				<div class="author-title"  style="width:80px;height:60px;padding-top:10px;">
					<span>{$author.name}</span>
				</div>
			</a>
		</div>
{/foreach}
<h2 class="title"> users May Interst </h2>
{foreach item=user from=$related_users name=page}
		<div style="" 
		class="user-item inline-block">
			<a class="hand" href="{$projectUrl}user.php?bid={$user.__jsID}">
				<div class="user-title"  style="width:80px;height:60px;padding-top:10px;">
					<span>{$user.user_name}</span>
				</div>
			</a>
		</div>
{/foreach}