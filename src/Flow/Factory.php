<?php

namespace Flow;

/**
 * Class Factory
 *
 * PHP Version 5
 *
 * @category  PHP
 * @package   Flow
 * @author    Simplicity Trade GmbH <it@simplicity.ag>
 * @copyright 2014-2016 Simplicity Trade GmbH
 * @license   Proprietary http://www.simplicity.ag
 */
class Factory
{
	private static function getFlowFile()
	{
	}

	public static function create($config = null)
	{
		$factory = new static();

		return $factory->createFlow($config);
	}

	public function createFlow($localConfig = null)
	{
		if (null === $localConfig) {
			static::getFlowFile();
		}
	}
}
