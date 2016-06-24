<?php

namespace Flow\Console;

use Composer\IO\IOInterface;
use Exception;
use Flow\Command\DockerCommand;
use Flow\Command\InitCommand;
use Flow\Flow;
use Symfony\Component\Console\Application as BaseApplication;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Class Application
 *
 * PHP Version 5
 *
 * @category  PHP
 * @package   Flow\Console
 * @author    Simplicity Trade GmbH <it@simplicity.ag>
 * @copyright 2014-2016 Simplicity Trade GmbH
 * @license   Proprietary http://www.simplicity.ag
 */
class Application extends BaseApplication
{
	/**
	 * @var IOInterface
	 */
	protected $io;

	/**
	 * Application constructor.
	 */
	public function __construct()
	{
		parent::__construct('Flow', Flow::VERSION);
	}

	/**
	 * {@inheritdoc}
	 */
	public function run(InputInterface $input = null, OutputInterface $output = null)
	{
		if (null === $output) {
			$output = new ConsoleOutput();
		}

		return parent::run($input, $output);
	}

	public function doRun(InputInterface $input, OutputInterface $output)
	{
		try {
			$result = parent::doRun($input, $output);

			return $result;
		} catch (Exception $e) {
			throw $e;
		}
	}

	protected function getDefaultCommands()
	{
		$commands = array_merge(parent::getDefaultCommands(), array(
			new InitCommand(),
			new DockerCommand(),
		));
		if ('phar:' === substr(__FILE__, 0, 5)) {
		}

		return $commands;
	}


}
