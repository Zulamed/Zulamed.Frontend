<script lang="ts"></script>

<label class="large-label" for="username"
	>Automatically generated username from your first and last name</label
>
<div class="group username-type-group">
	<label class="radio-label" for="NameSurname">
		<input
			class="radio-all"
			id="NameSurname"
			type="radio"
			name="username-type"
			value="NameSurname"
		/>
		<img class="radio-img" src="" alt="" />
		<p class="username-type-label">NameSurname</p>
	</label>

	<label class="radio-label" for="Name_Surname">
		<input
			class="radio-all"
			id="Name_Surname"
			type="radio"
			name="username-type"
			value="Name_Surname"
		/>
		<img class="radio-img" src="" alt="" />
		<p class="username-type-label">Name_Surname</p>
	</label>

	<label class="radio-label" for="Name-Surname">
		<input
			class="radio-all"
			id="Name-Surname"
			type="radio"
			name="username-type"
			value="Name-Surname"
		/>
		<img class="radio-img" src="" alt="" />
		<p class="username-type-label">Name-Surname</p>
	</label>

	<label class="radio-label" for="NameSurnameYearofBirth">
		<input
			class="radio-all"
			id="NameSurnameYearofBirth"
			type="radio"
			name="username-type"
			value="NameSurnameYearofBirth"
		/>
		<img class="radio-img" src="" alt="" />
		<p class="username-type-label">NameSurnameYearofBirth</p>
	</label>

	<label class="radio-label" for="NameSurnameNumber">
		<input
			class="radio-all"
			id="NameSurnameNumber"
			type="radio"
			name="username-type"
			value="NameSurnameNumber"
		/>
		<img class="radio-img" src="" alt="" />
		<p class="username-type-label">NameSurnameNumber</p>
	</label>
</div>

<style>
	.large-label {
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		cursor: pointer;
	}
	.group {
		position: relative;
		margin-top: 16px;
	}
	.radio-label {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.radio-label:not(:last-child) {
		margin-bottom: 12px;
	}
	.radio-all {
		position: absolute;
		visibility: hidden;
	}
	div.group > label > img {
		margin-right: 25px;
		width: 24px;
		height: 24px;
		content: url(../img/icons/Dell2.svg);
		border: none;
		pointer-events: none;
	}

	div.group > label > input:checked + img {
		content: url(../img/icons/Dell.svg);
	}
	.username-type-label {
		color: #000;
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
	}
	.username-type-group {
		margin-top: 45px !important;
	}
	@media (max-width: 1280px) {
		label {
			font-size: 15px;
		}

		.group {
			margin-top: 10px;
		}
	}
	@media (max-width: 1024px) {
		label {
			font-size: 13px;
		}

		.group {
			margin-top: 10px;
		}
	}
	@media (max-width: 768px) {
		label {
			font-size: 14px;
		}

		.large-label {
			font-size: 14px;
		}
	}
</style>
