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
<div class="recommandations-container">
<h2 class="title">books trends </h2>
{foreach item=book from=$related_books name=page}
		<span style="">
			<a class="hand" href="{$projectUrl}book.php?bid={$book.__jsID}">
					<span>{$book.title}</span>
			</a>
		</span>
{/foreach}
</div>
<div class="recommandations-container">
<h2 class="title"> users May Interst </h2>
{foreach item=book from=$books name=page}
		<div style="" 
		class="book-item inline-block"  server="{ id: "{$book.parent.__jsID}" }">
			<a class="hand" href="{$projectUrl}book.php?bid={$book.__jsID}">
				<div class="book-title"  style="width:80px;height:60px;padding-top:10px;">
					<span>{$book.title}</span>
				</div>
			</a>
		</div>
{/foreach}
</div>
<div class="recommandations-container">
<h2 class="title">tags</h2>
{foreach item=category from=$related_categories name=page}
		<span style="">
			<a class="hand" href="{$projectUrl}explore/books/?categoryId={$category.id}">
					<div class="category-link tag">{$category.value}{$category.count}</div>
			</a>
		</span>
{/foreach}
</div>
<div class="recommandations-container">
<h2 class="title"> Authors in the same context </h2>
{foreach item=book from=$books name=page}
		<div style="" 
		class="book-item inline-block"  server="{ id: "{$book.parent.__jsID}" }">
			<a class="hand" href="{$projectUrl}book.php?bid={$book.__jsID}">
				<div class="book-title"  style="width:80px;height:60px;padding-top:10px;">
					<span>{$book.title}</span>
				</div>
			</a>
		</div>
{/foreach}
</div>