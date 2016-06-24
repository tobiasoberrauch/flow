<?php

namespace Flow\Command;

use Flow\Docker\DockerService;
use Grow\Package\PostgresPackage;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Class DockerCommand
 *
 * PHP Version 5
 *
 * @category  PHP
 * @package   Flow\Command
 * @author    Simplicity Trade GmbH <it@simplicity.ag>
 * @copyright 2014-2016 Simplicity Trade GmbH
 * @license   Proprietary http://www.simplicity.ag
 */
class DockerCommand extends BaseCommand
{
	protected function configure()
	{
		$this
			->setName('docker')
			->setDescription('')
			->setDefinition(array())
			->setHelp(<<<EOT

EOT
			);
	}

	protected function execute(InputInterface $input, OutputInterface $output)
	{
		$postgresPackage = new PostgresPackage('postgres');

		$dockerService = new DockerService();
		$dockerService->create($postgresPackage);

	}
}
