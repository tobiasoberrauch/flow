<?php

namespace Flow\Package;

/**
 * Class BasePackage
 *
 * PHP Version 5
 *
 * @category  PHP
 * @package   Flow\Package
 * @author    Simplicity Trade GmbH <it@simplicity.ag>
 * @copyright 2014-2016 Simplicity Trade GmbH
 * @license   Proprietary http://www.simplicity.ag
 */
abstract class BasePackage implements PackageInterface
{
	const STABILITY_STABLE  = 0;
	const STABILITY_RC      = 5;
	const STABILITY_BETA    = 10;
	const STABILITY_ALPHA   = 15;
	const STABILITY_DEV     = 20;

	public static $stabilities = array(
		'stable' => self::STABILITY_STABLE,
		'RC'     => self::STABILITY_RC,
		'beta'   => self::STABILITY_BETA,
		'alpha'  => self::STABILITY_ALPHA,
		'dev'    => self::STABILITY_DEV,
	);
}
