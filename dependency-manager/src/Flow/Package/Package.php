<?php

namespace Flow\Package;

/**
 * Class Package
 *
 * PHP Version 5
 *
 * @category  PHP
 * @package   Flow\Package
 * @author    Simplicity Trade GmbH <it@simplicity.ag>
 * @copyright 2014-2016 Simplicity Trade GmbH
 * @license   Proprietary http://www.simplicity.ag
 */
class Package extends BasePackage
{
	/** @var string  */
	protected $name;
	/** @var  string */
	protected $image;

	/**
	 * Package constructor.
	 * @param string $name The package name.
	 */
	public function __construct($name)
	{
		$this->name = $name;
	}

	/**
	 * @return string
	 */
	public function getImage()
	{
		return $this->image;
	}

	/**
	 * @param string $image
	 *
	 * @return void
	 */
	public function setImage($image)
	{
		$this->image = $image;
	}

	/**
	 * @return mixed
	 */
	public function getName()
	{
		return $this->name;
	}

}
