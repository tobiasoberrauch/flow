<?php

namespace Flow\Docker;

use Docker\API\Model\BuildInfo;
use Docker\API\Model\ContainerConfig;
use Docker\API\Model\ContainerCreateResult;
use Docker\Context\ContextBuilder;
use Docker\Docker;
use Docker\Manager\ImageManager;
use Flow\Package\Package;

/**
 * Class DockerService
 *
 * PHP Version 5
 *
 * @category  PHP
 * @package   Flow\Docker
 * @author    Simplicity Trade GmbH <it@simplicity.ag>
 * @copyright 2014-2016 Simplicity Trade GmbH
 * @license   Proprietary http://www.simplicity.ag
 */
class DockerService
{
	/** @var Docker  */
	protected $docker;
	/** @var  ContainerCreateResult */
	protected $container;

	public function __construct()
	{
		$this->docker = new Docker();
	}

	public function create(Package $package)
	{
		$containerManager = $this->docker->getContainerManager();

		$containerConfig = new ContainerConfig();
		$containerConfig->setNames([$package->getName()]);
		$containerConfig->setImage($package->getImage());
		$containerConfig->setCmd(['echo', 'I am running a command']);
		$containerConfig->setOpenStdin(true);
		$containerConfig->setTty(true);

		$containerConfig->setAttachStdin(true);
		$containerConfig->setAttachStdout(true);
		$containerConfig->setAttachStderr(true);

		$container = $this->container = $containerManager->create($containerConfig);

		$parameters = array(
			'stream' => true,
			'stdin'  => true,
			'stdout' => true,
			'stderr' => true,
		);

		$attachStream = $containerManager->attach($container->getId(), $parameters);
		$attachStream->onStdout(function ($stdout) {
			echo $stdout;
		});
		$attachStream->onStderr(function ($stderr) {
			echo $stderr;
		});

		$webSocketStream = $containerManager->attachWebsocket($container->getId(), array(
			'stream' => true,
			'stdout' => true,
			'stderr' => true,
			'stdin'  => true,
		));


		$containerManager->start($container->getId());


//		$webSocketStream->write('echo tobias');
		$line = $webSocketStream->read();
		var_dump($line);

		$attachStream->wait();
	}

	public function createImage()
	{
//		$imageManager = $this->docker->getImageManager();
//		$buildInfoList = $imageManager->build($inputStream);
//
//		foreach ($buildInfoList as $buildInfo) {
//			echo $buildInfo->getStream();
//		}
	}

	public function createContext()
	{
		$contextBuilder = new ContextBuilder();
		$contextBuilder->from('postgres');
		$contextBuilder->add('/foo', 'random content');
		$contextBuilder->copy('/foo', '/bar');
		$contextBuilder->run('foo command');
		$contextBuilder->env('foo', 'bar');
		$contextBuilder->workdir('/foo');
		$contextBuilder->expose('80');

		$context = $contextBuilder->getContext();
		$context->toTar();

		$imageManager = $this->docker->getImageManager();

		$buildStream = $imageManager->build(
			$context->read(),
			array(
				't' => 'test-image',
			),
			ImageManager::FETCH_STREAM
		);
		$lastMessage = "";

		$buildStream->onFrame(function (BuildInfo $frame) use (&$lastMessage) {
			$lastMessage = $frame->getStream();
		});
		$buildStream->wait();
	}


	function __destruct()
	{
		$this->docker->getContainerManager()->kill($this->container->getId(), array(
			'signal' => 'SIGKILL'
		));
	}


}
